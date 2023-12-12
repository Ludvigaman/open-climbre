namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Authorization;
using WebApi.Helpers;
using WebApi.Models;
using WebApi.Models.Users;
using WebApi.Services;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;
    private IJwtUtils _jwtUtils;

    public UsersController(IUserService userService, IJwtUtils utils)
    {
        _userService = userService;
        _jwtUtils = utils;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest request)
    {
        var response = _userService.Authenticate(request);
        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register(RegisterRequest model)
    {
        _userService.Register(model);
        return Ok(new { message = "Registration successful" });
    }

    [AllowAnonymous]
    [HttpGet("resetPassword")]
    public IActionResult RequestReset(string email)
    {
        var response = _userService.requestPasswordReset(email);
        return Ok(response.Result);
    }


    [AllowAnonymous]
    [HttpGet("reset")]
    public IActionResult ResetPassword(string token)
    {
        var response = _userService.resetPassword(token);
        return Ok(response.Result);
    }

    [HttpPost("updatePassword")]
    public IActionResult UpdatePassword([FromBody] UpdateRequest request)
    {
        var response = _userService.UpdatePassword(request);
        return Ok(response.Result);
    }

    [HttpGet("validate")]
    public int ValidateToken(int userId, string token)
    {
        int? id = _jwtUtils.ValidateToken(token);
        if (id != null)
        {
            return userId;
        }
        else return 0;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }

    [HttpGet("isAdmin")]
    public IActionResult IsAdmin(int userId)
    {
        return Ok(_userService.IsAdmin(userId));
    }

    [HttpGet("isBuilder")]
    public IActionResult IsBuilder(int userId)
    {
        return Ok(_userService.IsBuilder(userId));
    }

    [HttpGet("builderList")]
    public IActionResult GetAllBuilders()
    {
        return Ok(_userService.GetBuilders());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user);
    }

    [HttpGet("progress")]
    public IActionResult GetProgressList(int userId)
    {
        return Ok(_userService.getProgressList(userId));
    }

    [HttpGet("progressForWall")]
    public IActionResult GetProgressListForWall(Guid wallId)
    {
        return Ok(_userService.getProgressListForWall(wallId));
    }

    [HttpGet("deleteProgress")]
    public IActionResult DeleteProgress(Guid id)
    {
        return Ok(_userService.deleteProgress(id));
    }

    [HttpPost("progress")]
    public IActionResult UpdateProgess([FromBody] UserWallProgress progress)
    {
        var responsEntry = _userService.updateProgress(progress);
        return Ok(responsEntry);
    }

    [HttpPost("progressList")]
    public IActionResult UpdateProgess([FromBody] List<UserWallProgress> progressList)
    {
        var responsEntry = _userService.updateProgressList(progressList);
        return Ok(responsEntry);
    }

    [AllowAnonymous]
    [HttpGet("name")]
    public IActionResult GetName(int userId)
    {
        var user = _userService.GetById(userId);
        return Ok(user.Name);
    }

    [HttpGet("enableBuilder")]
    public IActionResult AddBuilder(string userName)
    {
        var user = _userService.AddBuilder(userName);
        return Ok(user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateRequest model)
    {
        _userService.Update(id, model);
        return Ok(new { message = "User updated successfully" });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userService.Delete(id);
        return Ok(new { message = "User deleted successfully" });
    }
}