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
        public PersonalInfo PersonalInfo { get; set; } = new();
        public GymInfo GymInfo { get; set; } = new();
        public OperatingDetails OperatingDetails { get; set; } = new();
        public FacilitiesServices FacilitiesServices { get; set; } = new();
        public GymDocuments GymDoc { get; set; } = new();
    }
    public class PersonalInfo
    {
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class GymInfo
    {
        public string GymName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ContactNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class OperatingDetails
    {
        public List<string> Days { get; set; } = new();
        public string MorningOpen { get; set; } = string.Empty;
        public string MorningClose { get; set; } = string.Empty;
        public string EveningOpen { get; set; } = string.Empty;
        public string EveningClose { get; set; } = string.Empty;
        public string Fee { get; set; } = string.Empty; // Can be parsed to a number if needed
    }

    public class FacilitiesServices
    {
        public List<string> Facilities { get; set; } = new();
        public List<string> Services { get; set; } = new();
    }

    public class GymDocuments
    {
        public IFormFile? GymLogo { get; set; }
        public IFormFile? GstDoc { get; set; }
    }
}
