using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dtos
{
    public class GymRegistrationRequest
    {
        // Operating Details
        public List<string> Days { get; set; } = new List<string>();
        public string MorningOpen { get; set; }
        public string MorningClose { get; set; }

        // Fee can be string or number in TS — use decimal in C#
        public decimal Fee { get; set; }

        // Documents
        public IFormFile? GymLogo { get; set; }
    }
}
