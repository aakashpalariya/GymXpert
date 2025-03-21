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
        public int GymID { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [Required]
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
        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
