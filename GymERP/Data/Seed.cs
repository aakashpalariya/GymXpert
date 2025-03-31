using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            string currentDirectory = Directory.GetCurrentDirectory();
            string parentDirectory = Directory.GetParent(currentDirectory).FullName;
            string newDirectory = Path.Combine(parentDirectory, "Data");
            string filePath = Path.Combine(newDirectory, "UserSeedData.json");

            try
            {

                string jsonContent;
                using (var reader = new StreamReader(filePath, Encoding.UTF8, true))  // true enables BOM detection
                {
                    jsonContent = await reader.ReadToEndAsync();
                }

                var users = JsonSerializer.Deserialize<List<User>>(jsonContent);

                var roles = new List<Role>
                {
                    new Role{Name = "Admin"},
                    new Role{Name = "GymAdmin"},
                    new Role{Name = "Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    user.UserName = user.UserName.ToLower();

                    await userManager.CreateAsync(user, "Pa$$w0rd");

                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }
            catch (Exception ex)
            {
                var data = ex.Message;
            }

        }
    }
}
