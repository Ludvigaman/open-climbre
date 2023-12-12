using climber_api.Models;

namespace WebApi.Models
{
    public class UserWallProgress
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public Guid WallId { get; set; }
        public int Attempts { get; set; }
        public bool Completed { get; set; }
        public bool Archived { get; set; }
    }
}
