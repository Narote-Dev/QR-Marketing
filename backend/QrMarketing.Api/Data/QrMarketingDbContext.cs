using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Data.Entities;
using QrMarketing.Api.Data.Seed;

namespace QrMarketing.Api.Data;

public sealed class QrMarketingDbContext(DbContextOptions<QrMarketingDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<SubscriptionPlan> SubscriptionPlans => Set<SubscriptionPlan>();
    public DbSet<PlanEntitlement> PlanEntitlements => Set<PlanEntitlement>();
    public DbSet<UserSubscription> UserSubscriptions => Set<UserSubscription>();
    public DbSet<UserQuotaUsage> UserQuotaUsages => Set<UserQuotaUsage>();
    public DbSet<DynamicQr> DynamicQrs => Set<DynamicQr>();
    public DbSet<ScanEvent> ScanEvents => Set<ScanEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Step 1: Users and subscription catalog.
        var user = modelBuilder.Entity<User>();
        user.ToTable("users");
        user.HasKey(x => x.Id);
        user.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
        user.Property(x => x.AuthProviderId).HasMaxLength(128).IsRequired();
        user.HasIndex(x => x.AuthProviderId).IsUnique();
        user.Property(x => x.Email).HasMaxLength(320);
        user.Property(x => x.PlanCode).HasMaxLength(32).IsRequired().HasDefaultValue("free");
        user.Property(x => x.Status).HasMaxLength(20).IsRequired().HasDefaultValue("active");
        user.Property(x => x.CreatedAt).IsRequired();
        user.Property(x => x.UpdatedAt).IsRequired();

        var plan = modelBuilder.Entity<SubscriptionPlan>();
        plan.ToTable("subscription_plans");
        plan.HasKey(x => x.Code);
        plan.Property(x => x.Code).HasMaxLength(32);
        plan.Property(x => x.DisplayName).HasMaxLength(100).IsRequired();
        plan.Property(x => x.BillingInterval).HasMaxLength(16);
        plan.Property(x => x.Currency).HasColumnType("char(3)");

        var entitlement = modelBuilder.Entity<PlanEntitlement>();
        entitlement.ToTable("plan_entitlements");
        entitlement.HasKey(x => x.Id);
        entitlement.Property(x => x.PlanCode).HasMaxLength(32).IsRequired();
        entitlement.Property(x => x.EntitlementKey).HasMaxLength(64).IsRequired();
        entitlement.Property(x => x.ValueType).HasMaxLength(16).IsRequired();
        entitlement.HasIndex(x => new { x.PlanCode, x.EntitlementKey }).IsUnique();
        entitlement.HasOne(x => x.Plan).WithMany(x => x.Entitlements).HasForeignKey(x => x.PlanCode);

        var subscription = modelBuilder.Entity<UserSubscription>();
        subscription.ToTable("user_subscriptions");
        subscription.HasKey(x => x.Id);
        subscription.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
        subscription.Property(x => x.PlanCode).HasMaxLength(32).IsRequired();
        subscription.Property(x => x.Status).HasMaxLength(24).IsRequired();
        subscription.Property(x => x.BillingProvider).HasMaxLength(32);
        subscription.Property(x => x.BillingExternalId).HasMaxLength(128);
        subscription.Property(x => x.PendingPlanCode).HasMaxLength(32);
        subscription.HasIndex(x => x.UserId).HasDatabaseName("idx_user_subscriptions_user_id");
        subscription.HasOne(x => x.User).WithMany(x => x.Subscriptions).HasForeignKey(x => x.UserId);
        subscription.HasOne(x => x.Plan).WithMany().HasForeignKey(x => x.PlanCode);

        var quotaUsage = modelBuilder.Entity<UserQuotaUsage>();
        quotaUsage.ToTable("user_quota_usage");
        quotaUsage.HasKey(x => x.Id);
        quotaUsage.Property(x => x.QuotaKey).HasMaxLength(64).IsRequired();
        quotaUsage.HasIndex(x => new { x.UserId, x.QuotaKey, x.PeriodStart }).IsUnique();
        quotaUsage.HasOne(x => x.User).WithMany(x => x.QuotaUsages).HasForeignKey(x => x.UserId);

        // Step 2: Dynamic QR master table.
        var dynamicQr = modelBuilder.Entity<DynamicQr>();
        dynamicQr.ToTable("dynamic_qr");
        dynamicQr.HasKey(x => x.Id);
        dynamicQr.Property(x => x.Id).HasDefaultValueSql("gen_random_uuid()");
        dynamicQr.Property(x => x.ShortCode).HasMaxLength(10).IsRequired();
        dynamicQr.HasIndex(x => x.ShortCode).IsUnique();
        dynamicQr.Property(x => x.OwnerTokenHash).HasColumnType("char(64)");
        dynamicQr.HasIndex(x => x.OwnerTokenHash).HasDatabaseName("idx_dynamic_qr_owner_token_hash");
        dynamicQr.Property(x => x.DestinationUrl).HasMaxLength(2048).IsRequired();
        dynamicQr.Property(x => x.Label).HasMaxLength(100);
        dynamicQr.Property(x => x.IsActive).IsRequired().HasDefaultValue(true);
        dynamicQr.Property(x => x.ScanCountCached).IsRequired().HasDefaultValue(0L);
        dynamicQr.Property(x => x.CreatedAt).IsRequired();
        dynamicQr.Property(x => x.UpdatedAt).IsRequired();
        dynamicQr.HasIndex(x => x.UserId).HasDatabaseName("idx_dynamic_qr_user_id");
        dynamicQr.HasIndex(x => new { x.UserId, x.IsActive }).HasDatabaseName("idx_dynamic_qr_user_status");
        dynamicQr.HasOne(x => x.User).WithMany(x => x.DynamicQrs).HasForeignKey(x => x.UserId);

        // Step 3: Scan events append-only log.
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

        SubscriptionSeed.Apply(modelBuilder);
    }
}
