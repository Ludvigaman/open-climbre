namespace WebApi.Models;

using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public DateTime DateJoined { get; set; } = DateTime.Now;
    public bool IsBuilder { get; set; } = false;
    public bool IsAdmin { get; set; } = false;
    public List<UserWallProgress> ProgressList { get; set; }

    [JsonIgnore]
    public string PasswordHash { get; set; }
}