using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace NID.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [PersonalData]
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
    }
}
