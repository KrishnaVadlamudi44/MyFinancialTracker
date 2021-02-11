using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MyFinancialTracker.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Data
{
    public class MyFinancialTrackerDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public MyFinancialTrackerDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres database
            options.UseNpgsql(_configuration.GetConnectionString("MyFinancialTrackerDatabase"));

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("uuid-ossp");

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserInfoConfiguration());
            modelBuilder.ApplyConfiguration(new SessionConfiguration());
            modelBuilder.ApplyConfiguration(new ItemConfiguration());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<UserInfo> UsersInfo { get; set; }
        public DbSet<Item> Items { get; set; }

    }
}
