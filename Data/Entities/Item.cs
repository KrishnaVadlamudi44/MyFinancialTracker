using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace MyFinancialTracker.Data.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string ItemId { get; set; }
        public string AccessToken { get; set; }
        public string InstitutionId { get; set; }
        public Guid UserGuid { get; set; }
    }

    internal class ItemConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> builder)
        {
            builder.ToTable("Item");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnType<int>("integer")
                .UseIdentityAlwaysColumn();

            builder.Property(x => x.ItemId)
                .HasColumnType<string>("text");

            builder.Property(x => x.AccessToken)
                .HasColumnType<string>("text");

            builder.Property(x => x.UserGuid)
                .HasColumnType<Guid>("uuid");

        }
    }
}
