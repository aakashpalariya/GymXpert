using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    [Table("Gyms")]
    public class Gym
    {
        [Key]
        public int GymId { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Address { get; set; }

        [MaxLength(100)]
        public string City { get; set; }

        [MaxLength(100)]
        public string State { get; set; }

        [MaxLength(15)]
        public string ContactNumber { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public DateTime JoinedDate { get; set; }

        public DateTime DateUpdated { get; set; } = DateTime.UtcNow;

        public ICollection<UserGym> UserGyms { get; set; }
    }
}
