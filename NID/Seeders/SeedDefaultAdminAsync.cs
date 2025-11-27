using Microsoft.AspNetCore.Identity;
using NID.Models;

namespace NID.Seeders
{
    public static class SeedDefaultAdmin
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

            string adminRole = "Admin";
            string adminEmail = "admin@nid.com";
            string adminPassword = "Admin123!"; // change in production

            // Create role if it doesn't exist
            if (!await roleManager.RoleExistsAsync(adminRole))
            {
                await roleManager.CreateAsync(new IdentityRole(adminRole));
            }

            // Create admin user if it doesn't exist
            var admin = await userManager.FindByEmailAsync(adminEmail);

            if (admin == null)
            {
                admin = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FirstName = "System",
                    LastName = "Administrator",
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(admin, adminPassword);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, adminRole);
                }
                else
                {
                    throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
        }
    }
}