﻿using System.ComponentModel.DataAnnotations;

namespace Dtos
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateOnly? DateOfBirth { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}
