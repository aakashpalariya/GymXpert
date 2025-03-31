using Microsoft.AspNetCore.Identity;

namespace Data.Entities
{
    public class User : IdentityUser<int>
    {
        public DateOnly DateOfBirth { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public string MobileNumber { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsLocked { get; set; } = false;
        public bool IsDeleted { get; set; }
        public DateTime JoinedDate { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<UserGym> UserGyms { get; set; }
        public List<UserPhoto> UserPhotos { get; set; }
    }
}
