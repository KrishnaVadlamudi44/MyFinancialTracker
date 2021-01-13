using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace MyFinancialTracker.Data.Entities
{
    public class User
    {
        public int Id { get; }
        public Guid UserGuid { get; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }

    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnType<int>("integer")
                .UseIdentityAlwaysColumn();

            builder.Property(x => x.UserGuid)
                .HasColumnType<Guid>("uuid")
                .HasDefaultValueSql("uuid_generate_v4()");
                
            builder.Property(x => x.UserName)
                .HasColumnType<string>("text");

            builder.Property(x => x.PasswordHash)
                .HasColumnType<byte[]>("bytea");

            builder.Property(x => x.PasswordSalt)
                .HasColumnType<byte[]>("bytea");
        }
    }
}
