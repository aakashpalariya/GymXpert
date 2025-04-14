using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class PlanDuration
    {
        [Key]
        public int DurationId { get; set; }
        public int PlanId { get; set; }
        public int DurationMonths { get; set; } // 1, 3, 6, 12
        [Precision(18, 2)]
        public decimal DiscountPercent { get; set; }
        [Precision(18, 2)]
        public decimal TotalPrice { get; set; }

        public Plan Plan { get; set; }
    }
}
