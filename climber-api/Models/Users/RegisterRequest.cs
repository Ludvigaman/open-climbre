namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}