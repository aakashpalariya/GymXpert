using Microsoft.AspNetCore.Identity;

namespace Data.Entities
{
    public class User : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public List<UserPhoto> Photos { get; set; } = new();
        public required ICollection<UserRole> UserRoles { get; set; }
    }
}
