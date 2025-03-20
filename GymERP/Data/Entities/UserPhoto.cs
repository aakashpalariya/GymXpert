using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    [Table("UserPhotos")]
    public class UserPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; } = false;
        public string PublicId { get; set; }
        public bool IsApproved { get; set; }
        public int AppUserId { get; set; }
        public User AppUser { get; set; }
    }
}
