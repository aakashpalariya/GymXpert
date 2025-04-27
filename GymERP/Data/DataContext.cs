using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole,
        IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<PlanDuration> PlanDuration { get; set; }
        public DbSet<Gym> Gyms { get; set; }
        public DbSet<GymPlan> GymPlan { get; set; }
        public DbSet<UserGym> UserGyms { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Custom table names
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Role>().ToTable("Roles");

            modelBuilder.Entity<User>()
                .Property(u => u.JoinedDate)
                .HasDefaultValue(DateTime.UtcNow);

            // Mapping UserRole with composite primary key
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .ToTable("UserRoles");

            // Defining relationships
            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            // Custom Identity tables
            modelBuilder.Entity<IdentityUserClaim<int>>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityUserLogin<int>>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityRoleClaim<int>>().ToTable("RoleClaims");
            modelBuilder.Entity<IdentityUserToken<int>>().ToTable("UserTokens");

            modelBuilder.Entity<GymPlan>()
                .HasKey(gs => new { gs.GymId, gs.PlanId });

            modelBuilder.Entity<GymPlan>()
                .HasOne(gs => gs.Gym)
                .WithMany()
                .HasForeignKey(gs => gs.GymId);

            modelBuilder.Entity<GymPlan>()
                .HasOne(gs => gs.Plan)
                .WithMany()
                .HasForeignKey(gs => gs.PlanId);

            modelBuilder.Entity<GymPlan>()
                .Property(gs => gs.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Gym>()
                .Property(gs => gs.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Gym>()
                .Property(gs => gs.IsDeleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<Gym>()
                .Property(gs => gs.JoinedDate)
                .HasDefaultValue(DateTime.UtcNow);

            modelBuilder.Entity<UserGym>()
                .HasKey(ug => new { ug.UserId, ug.GymId });

            modelBuilder.Entity<UserGym>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGyms)
                .HasForeignKey(ug => ug.UserId);

            modelBuilder.Entity<UserGym>()
                .HasOne(ug => ug.Gym)
                .WithMany(g => g.UserGyms)
                .HasForeignKey(ug => ug.GymId);

            modelBuilder.Entity<UserGym>()
                .Property(u => u.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Plan>()
                .HasMany(p => p.Durations)
                .WithOne(d => d.Plan)
                .HasForeignKey(d => d.PlanId);

            modelBuilder.Entity<Country>()
                .Property(gs => gs.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Country>()
                .Property(gs => gs.IsDeleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<State>()
                .Property(gs => gs.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<State>()
                .Property(gs => gs.IsDeleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<State>()
                .HasOne(s => s.Country)
                .WithMany(c => c.States)
                .HasForeignKey(s => s.CountryId);

        }
    }
}