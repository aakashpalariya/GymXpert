using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dtos
{
    public class GymRegisterDto
    {
        public PersonalInfo PersonalInfo { get; set; }
        public GymInfo GymInfo { get; set; }
        public OperatingDetails OperatingDetails { get; set; }
        public FacilitiesServices FacilitiesServices { get; set; }
        public GymDoc GymDoc { get; set; }
    }

    public class PersonalInfo
    {
        public string FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string LastName { get; set; }
        public string? Gender { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
    }

    public class GymInfo
    {
        public string GymName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
    }

    public class OperatingDetails
    {
        public List<string> Days { get; set; }
        public string MorningOpen { get; set; }
        public string MorningClose { get; set; }
        public string EveningOpen { get; set; }
        public string EveningClose { get; set; }
        public string Fee { get; set; }
    }

    public class FacilitiesServices
    {
        public List<string> Facilities { get; set; }
        public List<string> Services { get; set; }
    }

    public class GymDoc
    {
        public IFormFile? GymLogo { get; set; }
        public IFormFile? GstDoc { get; set; }
    }

}
