﻿using System.Security.Claims;

namespace Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return Convert.ToInt32(user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}
