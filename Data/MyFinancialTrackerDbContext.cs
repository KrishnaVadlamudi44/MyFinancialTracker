using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFinancialTracker.Data
{
    public class MyFinancialTrackerDbContext:DbContext
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
        }


    }
}
