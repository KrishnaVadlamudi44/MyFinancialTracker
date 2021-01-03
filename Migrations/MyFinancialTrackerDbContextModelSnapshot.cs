﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyFinancialTracker.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace MyFinancialTracker.Migrations
{
    [DbContext(typeof(MyFinancialTrackerDbContext))]
    partial class MyFinancialTrackerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasPostgresExtension("uuid-ossp")
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");
#pragma warning restore 612, 618
        }
    }
}
