using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class SubscriptionPlan
    {
        [Key]
        public int PlanId { get; set; }

        public string Name { get; set; } // e.g., Base, Regular, Premium

        [Precision(18, 2)]
        public decimal Price { get; set; } // Monthly price

        public int Duration { get; set; } // Duration in months (1, 3, 6, 12)

        public int MaxMembers { get; set; } // Maximum members allowed

        public int MaxGymAdmins { get; set; } // Maximum GymAdmins allowed

        public string Features { get; set; } // Features as a comma-separated list

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

}
