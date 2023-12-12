using WebApi.Entities;

namespace WebApi.Models
{
    public class UserRating
    {
        public Guid Id { get; set; }
        public User Author { get; set; }
        public string Comment { get; set; }
        public DateTime Created { get; set; }
        public Star Rate { get; set; }

    }
}
