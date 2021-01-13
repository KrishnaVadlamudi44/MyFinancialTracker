using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace MyFinancialTracker.Data.Entities
{
    public class Session
    {
        public int Id { get; }
        public Guid SessionUuid { get; }
        public Guid UserUuid { get; set; }
        public string SessionInfo { get; set; }
        public DateTime Expiry { get; set; }
    }

    internal class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {
            builder.ToTable("Session");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnType<int>("integer")
                .UseIdentityAlwaysColumn();

            builder.Property(x => x.SessionUuid)
                .HasColumnType<Guid>("uuid")
                .HasDefaultValueSql("uuid_generate_v4()");

            builder.Property(x => x.UserUuid)
                .HasColumnType<Guid>("uuid");

            builder.Property(x => x.SessionInfo)
                .HasColumnType<string>("json");

            builder.Property(x => x.Expiry)
                .HasColumnType<DateTime>("timestamp without time zone");
        }
    }
}
