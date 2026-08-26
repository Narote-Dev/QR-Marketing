using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Data.Entities;

namespace QrMarketing.Api.Data;

public sealed class QrMarketingDbContext(DbContextOptions<QrMarketingDbContext> options) : DbContext(options)
{
    public DbSet<DynamicQr> DynamicQrs => Set<DynamicQr>();
    public DbSet<ScanEvent> ScanEvents => Set<ScanEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Step 1: Map dynamic_qr master table (editable current state).
        var dynamicQr = modelBuilder.Entity<DynamicQr>();
        dynamicQr.ToTable("dynamic_qr");
        dynamicQr.HasKey(x => x.Id);
        dynamicQr.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
        dynamicQr.Property(x => x.ShortCode).HasMaxLength(10).IsRequired();
        dynamicQr.HasIndex(x => x.ShortCode).IsUnique();
        dynamicQr.Property(x => x.OwnerTokenHash).HasColumnType("char(64)").IsRequired();
        dynamicQr.HasIndex(x => x.OwnerTokenHash).HasDatabaseName("idx_dynamic_qr_owner_token_hash");
        dynamicQr.Property(x => x.DestinationUrl).HasMaxLength(2048).IsRequired();
        dynamicQr.Property(x => x.Label).HasMaxLength(100);
        dynamicQr.Property(x => x.IsActive).IsRequired().HasDefaultValue(true);
        dynamicQr.Property(x => x.CreatedAt).IsRequired();
        dynamicQr.Property(x => x.UpdatedAt).IsRequired();

        // Step 2: Map scan_events append-only log.
        var scanEvent = modelBuilder.Entity<ScanEvent>();
        scanEvent.ToTable("scan_events");
        scanEvent.HasKey(x => x.Id);
        scanEvent.Property(x => x.Id).ValueGeneratedOnAdd();
        scanEvent.Property(x => x.ScannedAt).IsRequired();
        scanEvent.Property(x => x.DeviceType).HasMaxLength(20);
        scanEvent.Property(x => x.Country).HasColumnType("char(2)");
        scanEvent.Property(x => x.Referrer).HasMaxLength(255);
        scanEvent.HasIndex(x => new { x.QrId, x.ScannedAt })
            .IsDescending(false, true)
            .HasDatabaseName("idx_scan_events_qr_id_time");
        scanEvent.HasOne(x => x.Qr)
            .WithMany(x => x.ScanEvents)
            .HasForeignKey(x => x.QrId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
