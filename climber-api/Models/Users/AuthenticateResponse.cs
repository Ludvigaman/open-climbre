namespace WebApi.Models.Users;

public class AuthenticateResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
    public string DateJoined { get; set; }  
}