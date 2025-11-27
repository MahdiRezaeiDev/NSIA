using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NID.Models;

namespace NID.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Family> Families { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Family <-> Members relationship
            builder.Entity<Family>()
                .HasMany(f => f.Members)
                .WithOne(p => p.Family)
                .HasForeignKey(p => p.FamilyId)
                .OnDelete(DeleteBehavior.SetNull);

            // Enforce unique FamilyCode
            builder.Entity<Family>()
                .HasIndex(f => f.FamilyCode)
                .IsUnique();
        }

    }
}
