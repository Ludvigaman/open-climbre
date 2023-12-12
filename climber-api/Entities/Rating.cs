using climber_api.Models;
using WebApi.Models;

namespace WebApi.Entities
{
    public class Rating
    {
        public Guid Id { get; set; }
        public Star Rate { get; set; }
        public UserRating[] UserRatings { get; set; }

    }

    public enum Star
    {
        One = 1,
        Two = 2,   
        Three = 3,
        Four = 4,
        Five = 5
    }
}
