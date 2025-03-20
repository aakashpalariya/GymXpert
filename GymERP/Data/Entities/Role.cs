﻿using Microsoft.AspNetCore.Identity;

namespace Data.Entities
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole>? UserRole { get; set; }
    }
}
