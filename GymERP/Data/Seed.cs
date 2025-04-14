using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
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

        public static async Task SeedPlans(DataContext context)
        {
            if (!context.Plans.Any())
            {
                var now = DateTime.UtcNow;

                var plans = new List<Plan>
                {
                    new Plan
                    {
                        PlanName = "Free",
                MonthlyPrice = 0,
                MaxMembers = 10,
                MaxGymAdmins = 1,
                Features = "Basic Access",
                IsActive = true,
                DateUpdated = now,
                Durations = new List<PlanDuration>
                {
                    new PlanDuration { DurationMonths = 1, DiscountPercent = 0, TotalPrice = 0 },
                    new PlanDuration { DurationMonths = 3, DiscountPercent = 0, TotalPrice = 0 },
                    new PlanDuration { DurationMonths = 6, DiscountPercent = 0, TotalPrice = 0 },
                    new PlanDuration { DurationMonths = 12, DiscountPercent = 0, TotalPrice = 0 }
                }
            },
            new Plan
            {
                PlanName = "Base",
                MonthlyPrice = 499,
                MaxMembers = 50,
                MaxGymAdmins = 2,
                Features = "Basic,Chat,Reports",
                IsActive = true,
                DateUpdated = now,
                Durations = new List<PlanDuration>
                {
                    new PlanDuration { DurationMonths = 1, DiscountPercent = 0, TotalPrice = 499 },
                    new PlanDuration { DurationMonths = 3, DiscountPercent = 20, TotalPrice = 1199 },
                    new PlanDuration { DurationMonths = 6, DiscountPercent = 30, TotalPrice = 2099 },
                    new PlanDuration { DurationMonths = 12, DiscountPercent = 40, TotalPrice = 3599 }
                }
            },
            new Plan
            {
                PlanName = "Regular",
                MonthlyPrice = 1499,
                MaxMembers = 200,
                MaxGymAdmins = 5,
                Features = "Chat,Reports,Schedule",
                IsActive = true,
                DateUpdated = now,
                Durations = new List<PlanDuration>
                {
                    new PlanDuration { DurationMonths = 1, DiscountPercent = 0, TotalPrice = 1499 },
                    new PlanDuration { DurationMonths = 3, DiscountPercent = 20, TotalPrice = 3599 },
                    new PlanDuration { DurationMonths = 6, DiscountPercent = 30, TotalPrice = 6299 },
                    new PlanDuration { DurationMonths = 12, DiscountPercent = 40, TotalPrice = 10799 }
                }
            },
            new Plan
            {
                PlanName = "Premium",
                MonthlyPrice = 2499,
                MaxMembers = 500,
                MaxGymAdmins = 10,
                Features = "All Features,Priority Support",
                IsActive = true,
                DateUpdated = now,
                Durations = new List<PlanDuration>
                {
                    new PlanDuration { DurationMonths = 1, DiscountPercent = 0, TotalPrice = 2499 },
                    new PlanDuration { DurationMonths = 3, DiscountPercent = 20, TotalPrice = 5999 },
                    new PlanDuration { DurationMonths = 6, DiscountPercent = 30, TotalPrice = 10499 },
                    new PlanDuration { DurationMonths = 12, DiscountPercent = 40, TotalPrice = 17999 }
                }
            }
        };

                context.Plans.AddRange(plans);
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedStates(DataContext context)
        {
            if (!context.States.Any())
            {
                var now = DateTime.UtcNow;
                string currentDirectory = Directory.GetCurrentDirectory();
                string parentDirectory = Directory.GetParent(currentDirectory).FullName;
                string newDirectory = Path.Combine(parentDirectory, "Data");
                string filePath = Path.Combine(newDirectory, "States.json");
                try
                {
                    string jsonContent;
                    using (var reader = new StreamReader(filePath, Encoding.UTF8, true))  // true enables BOM detection
                    {
                        jsonContent = await reader.ReadToEndAsync();
                    }

                    var states = JsonSerializer.Deserialize<List<State>>(jsonContent);
                    context.States.AddRange(states);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    var data = ex.Message;
                }
            }
        }
    }
}
