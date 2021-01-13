using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace MyFinancialTracker.Data.Entities
{
    public class UserInfo
    {
        public Guid UserGuid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    internal class UserInfoConfiguration : IEntityTypeConfiguration<UserInfo>
    {
        public void Configure(EntityTypeBuilder<UserInfo> builder)
        {
            builder.ToTable("UserInfo");

            builder.HasKey(x => x.UserGuid);

            builder.Property(x => x.UserGuid)
                .HasColumnType<Guid>("uuid");

            builder.Property(x => x.FirstName)
                .HasColumnType<string>("text");

            builder.Property(x => x.LastName)
                .HasColumnType<string>("text");

            builder.Property(x => x.Email)
                .HasColumnType<string>("text");

        }
    }
}
