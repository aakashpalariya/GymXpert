﻿using Microsoft.AspNetCore.Identity;

namespace Data.Entities
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
