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
        public string Fee { get; set; }
        public string MorningOpen { get; set; }
        public string MorningClose { get; set; }
        public string EveningOpen { get; set; }
        public string EveningClose { get; set; }
        public List<string> Days { get; set; }
        public IFormFile? GymLogo { get; set; }
    }
}
