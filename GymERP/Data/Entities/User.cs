using Microsoft.AspNetCore.Identity;

namespace Data.Entities
{
    public class User : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsLocked { get; set; }
        public bool IsActive { get; set; } = true;
        public string Gender { get; set; }
        public required ICollection<UserRole> UserRoles { get; set; }
        public required ICollection<UserPhoto> UserPhotos { get; set; }
    }
}
