using climber_api.Models;
using WebApi.Entities;
using WebApi.Entities.Enums;

namespace WebApi.Models
{
    public class Wall
    {
        public Guid Id { get; set; }
        public Grade Grade { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Color Color { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Removed { get; set; }
        public int UserId { get; set; }
        public Rating Rating { get; set; }
        public int Anchor { get; set; }
        public string TypesJSON { get; set; } //Compress a Type[] as JSON String to store in DB

    }
}
