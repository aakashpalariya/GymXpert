using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    [Table("GymSubscriptions")]
    public class GymSubscription
    {
        public int GymId { get; set; } // Foreign key to Gym table
        public int PlanId { get; set; } // Foreign key to SubscriptionPlans table
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PaymentStatus { get; set; } = "Pending";
        public bool AutoRenewal { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties (EF Relations)
        public Gym Gym { get; set; }
        public SubscriptionPlan SubscriptionPlan { get; set; }
    }

}
