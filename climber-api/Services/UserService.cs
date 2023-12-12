namespace WebApi.Services;

using AutoMapper;
using BCrypt.Net;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;
using WebApi.Models.Users;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(int id);
    void Register(RegisterRequest model);
    void Update(int id, UpdateRequest model);
    void Delete(int id);
    bool IsAdmin(int id);
    bool IsBuilder(int userId);
    User AddBuilder(string userName);
    Task<bool> requestPasswordReset(string email);
    Task<bool> UpdatePassword(UpdateRequest request);
    Task<bool> resetPassword(string resetToken);
    List<User> GetBuilders();
    List<UserWallProgress> getProgressList(int userId);
    List<UserWallProgress> getProgressListForWall(Guid wallId);
    UserWallProgress updateProgress(UserWallProgress progress);
    List<UserWallProgress> updateProgressList(List<UserWallProgress> progressList);
    bool deleteProgress(Guid id);
}

public class UserService : IUserService
{
    private DataContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;
    private IConfiguration _configuration;
    private IEmailService _emailService;

    public UserService(
        DataContext context,
        IEmailService emailService,
        IJwtUtils jwtUtils,
        IMapper mapper,
        IConfiguration configuration)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
        _emailService = emailService;
        _configuration = configuration; 
    }

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username.ToLower() == model.Username.ToLower());

        // validate
        if (user == null || !BCrypt.Verify(model.Password, user.PasswordHash)) 
            throw new AppException("Username or password is incorrect");

        // authentication successful
        var response = _mapper.Map<AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        return response;
    }

    public async Task<bool> requestPasswordReset(string email)
    {
        var user = _context.Users.FirstOrDefault(x => x.Email.ToLower() == email.ToLower());
        if (user == null)
        {
            return false;
        }
        else
        {
            string passwordLink = user.PasswordHash.Substring(0, 20);

            EmailRequest request = new EmailRequest();
            request.ToEmail = email;
            request.Subject = "OpenClimber password reset";

            string frontEndUrl = _configuration.GetSection("Connections")["FrontEndUrl"];

            string passwordResetUrl = frontEndUrl + "/reset/"+passwordLink;

            request.Body = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Password Reset</title>
                </head>
                <body style=""font-family: Arial, sans-serif; background-color: #f2f2f2;"">
                    <table style=""max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px;"">
                        <tr>
                            <td>
                                <h2 style=""text-align: center; color: #333333;"">Password Reset</h2>
                                <p style=""text-align: left; color: #666666;"">Hello,</p>
                                <p style=""text-align: left; color: #666666;"">You are receiving this email because you have requested a password reset for your account. If you did not request this reset, please ignore this email.</p>
                                <p style=""text-align: left; color: #666666;"">To reset your password, please click the link below:</p>
                                <p style=""text-align: center; margin-top: 30px;"">
                                    <a href=""{passwordResetUrl}"" style=""display: inline-block; padding: 12px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"">Reset Password</a>
                                </p>
                                <p style=""text-align: left; color: #666666;"">If you are unable to click the link above, you can copy and paste the following URL into your browser:</p>
                                <p style=""text-align: center; margin-top: 10px; word-break: break-all; color: #007bff;"">{passwordResetUrl}</p>
                                <p style=""text-align: left; color: #666666;"">Thank you,</p>
                                <p style=""text-align: left; color: #666666;"">OpenClimber</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                ";

            await _emailService.SendEmailAsync(request);
            return true;

        }
    }
    public async Task<bool> resetPassword(string resetToken)
    {
        var user = _context.Users.FirstOrDefault(x => x.PasswordHash.Substring(0,20) == resetToken);
        if (user == null)
        {
            return false;
        }
        else
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            var loginURL = _configuration.GetSection("Connections")["FrontEndUrl"] + "/login";

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);

            user.PasswordHash = BCrypt.HashPassword(finalString);
            _context.Users.Update(user);
            _context.SaveChanges();

            EmailRequest request = new EmailRequest();
            request.ToEmail = user.Email;
            request.Subject = "OpenClimber password reset";
            request.Body = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Password Reset</title>
                </head>
                <body style=""font-family: Arial, sans-serif; background-color: #f2f2f2;"">
                    <table style=""max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px;"">
                        <tr>
                            <td>
                                <h2 style=""text-align: center; color: #333333;"">Password Reset</h2>
                                <p style=""text-align: left; color: #666666;"">Hi,</p>
                                <p style=""text-align: left; color: #666666;"">Your password for your OpenClimber account has been reset.</p>
                                <p style=""text-align: left; color: #666666;"">Please log in using this temporary password, and change it on your profile page:</p>
                                <p style=""text-align: left; color: #666666;""><strong>{finalString}</strong></p>
                                <p style=""text-align: center; margin-top: 30px;"">
                                    <a href=""{loginURL}"" style=""display: inline-block; padding: 12px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;"">Reset Password</a>
                                </p>
                                <p style=""text-align: left; color: #666666;"">Thank you,</p>
                                <p style=""text-align: left; color: #666666;"">OpenClimber</p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
                ";

            await _emailService.SendEmailAsync(request);
            return true;

        }
    }

    public async Task<bool> UpdatePassword(UpdateRequest request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == request.Username && u.Email == request.Email);
        if(user == null)
        {
            return false;
        } else
        {

            // validate
            if (!BCrypt.Verify(request.OldPassword, user.PasswordHash))
            {
                throw new AppException("Username or password is incorrect");
            } else
            {
                //Insert new password
                user.PasswordHash = BCrypt.HashPassword(request.Password);
                _context.Users.Update(user);
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    return true;
                }
            }
        }
        return false;
    }

    public List<User> GetBuilders()
    {
        return _context.Users.Where(u => u.IsBuilder == true || u.IsAdmin == true).ToList();
    }

    public bool IsAdmin(int userId)
    {
        var user = getUser(userId);
        return user.IsAdmin;
    }

    public bool IsBuilder(int userId)
    {
        var user = getUser(userId);
        return user.IsBuilder;
    }

    public User AddBuilder(string userName)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username.ToLower() == userName.ToLower());
        user.IsBuilder = true;
        _context.Users.Update(user);
        var res = _context.SaveChanges();
        if(res > 0)
        {
            return user;
        }
        return new User();
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users;
    }

    public User GetById(int id)
    {
        return getUser(id);
    }

    public void Register(RegisterRequest model)
    {
        // validate
        if (_context.Users.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");
        if (_context.Users.Any(x => x.Email.ToLower() == model.Email.ToLower()))
            throw new AppException("Email '" + model.Username + "' is already in use");

        // map model to new user object
        var user = _mapper.Map<User>(model);

        // hash password
        user.PasswordHash = BCrypt.HashPassword(model.Password);

        // save user
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var user = getUser(id);

        // validate
        if (model.Username != user.Username && _context.Users.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");

        // hash password if it was entered
        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.HashPassword(model.Password);

        // copy model to user and save
        _mapper.Map(model, user);
        _context.Users.Update(user);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var user = getUser(id);
        _context.Users.Remove(user);
        _context.SaveChanges();
    }

    // helper methods

    private User getUser(int id)
    {
        var user = _context.Users.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }

    public List<UserWallProgress> getProgressList(int userId)
    {
        var list = _context.ProgressLists.ToList();
        return list.Where(x => x.UserId == userId).ToList();
    }

    public List<UserWallProgress> getProgressListForWall(Guid wallId)
    {
        var list = _context.ProgressLists.ToList();
        return list.Where(x => x.WallId == wallId).ToList();
    }

    public bool deleteProgress(Guid id)
    {
        var entity = _context.ProgressLists.Find(id);
        if(entity != null)
        {
            _context.ProgressLists.Remove(entity);
            _context.SaveChanges();
            return true;
        } else
        {
            return false;
        }

    }

    public UserWallProgress updateProgress(UserWallProgress progress)
    {
            var dbP = _context.ProgressLists.FirstOrDefault(p => p.UserId == progress.UserId && p.WallId == progress.WallId);
            
            if (dbP != null)
            {
                dbP.Completed = progress.Completed;
                dbP.Attempts = progress.Attempts;
                dbP.Archived = progress.Archived;
                _context.Update(dbP);
                _context.SaveChanges();
               
                return dbP;
            }
            else
            {
                progress.Id = Guid.NewGuid();
                _context.Add(progress);
                _context.SaveChanges();

                return progress;
            }

        return null;
    }

    public List<UserWallProgress> updateProgressList(List<UserWallProgress> progressList)
    {
        var resultList = new List<UserWallProgress>();

        progressList.ForEach(p =>
        {
            var dbP = _context.ProgressLists.Find(p.Id);
            if(dbP != null)
            {
                dbP = p;
                _context.Update(dbP);
                resultList.Add(dbP);
            } else
            {
                p.Id = Guid.NewGuid();
                _context.Add(p);
                resultList.Add(p);
            }
        });
        _context.SaveChanges();

        return resultList;
    }
}