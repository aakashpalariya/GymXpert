using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dtos
{
    public class PlanDto
    {
        public int PlanId { get; set; }

        public string PlanName { get; set; } // e.g., Base, Regular, Premium
        public decimal MonthlyPrice { get; set; } // Monthly price
        public int MaxMembers { get; set; } // Maximum members allowed
        public int MaxGymAdmins { get; set; } // Maximum GymAdmins allowed
        public string Features { get; set; } // Features as a comma-separated list
        public List<PlanDurationDto> Durations { get; set; }
    }
}
