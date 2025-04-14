using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dtos
{
    public class PlanDurationDto
    {
        public int DurationId { get; set; }
        public int PlanId { get; set; }
        public int DurationMonths { get; set; } // 1, 3, 6, 12
        public decimal DiscountPercent { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
