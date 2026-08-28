using Microsoft.EntityFrameworkCore;
using QrMarketing.Api.Data;
using QrMarketing.Api.Data.Entities;
using QrMarketing.Api.Services.Entitlements;

namespace QrMarketing.Api.Data.Seed;

public static class SubscriptionSeed
{
    public static void Apply(ModelBuilder modelBuilder)
    {
        var now = new DateTimeOffset(2026, 8, 28, 0, 0, 0, TimeSpan.Zero);

        modelBuilder.Entity<SubscriptionPlan>().HasData(
            new SubscriptionPlan
            {
                Code = "free",
                DisplayName = "Free",
                SortOrder = 0,
                IsPublic = true,
                IsActive = true,
                TrialDays = 0,
                GraceDays = 0,
                CreatedAt = now,
                UpdatedAt = now,
            },
            new SubscriptionPlan
            {
                Code = "pro",
                DisplayName = "Pro",
                SortOrder = 1,
                IsPublic = true,
                IsActive = true,
                BillingInterval = "month",
                TrialDays = 14,
                GraceDays = 3,
                CreatedAt = now,
                UpdatedAt = now,
            },
            new SubscriptionPlan
            {
                Code = "business",
                DisplayName = "Business",
                SortOrder = 2,
                IsPublic = true,
                IsActive = true,
                BillingInterval = "month",
                TrialDays = 14,
                GraceDays = 7,
                CreatedAt = now,
                UpdatedAt = now,
            },
            new SubscriptionPlan
            {
                Code = "enterprise",
                DisplayName = "Enterprise",
                SortOrder = 3,
                IsPublic = false,
                IsActive = true,
                BillingInterval = "year",
                TrialDays = 0,
                GraceDays = 14,
                CreatedAt = now,
                UpdatedAt = now,
            });

        modelBuilder.Entity<PlanEntitlement>().HasData(
            Entitlement(1, "free", EntitlementKeys.DynamicQrMaxActive, "integer", 6),
            Entitlement(2, "free", EntitlementKeys.ScanQuotaLimit, "integer", 7000),
            Entitlement(3, "free", EntitlementKeys.ScanQuotaPeriod, "json", null, """{"unit":"year","length":1}"""),
            Entitlement(4, "free", EntitlementKeys.ScanOverQuotaBehavior, "json", null, """{"redirect":"allow","log":"deny"}"""),
            Entitlement(5, "free", EntitlementKeys.ApiEnabled, "boolean", boolValue: false),

            Entitlement(6, "pro", EntitlementKeys.DynamicQrMaxActive, "integer", 25),
            Entitlement(7, "pro", EntitlementKeys.ScanQuotaLimit, "integer", 100_000),
            Entitlement(8, "pro", EntitlementKeys.ScanQuotaPeriod, "json", null, """{"unit":"month","length":1}"""),
            Entitlement(9, "pro", EntitlementKeys.ScanOverQuotaBehavior, "json", null, """{"redirect":"allow","log":"deny"}"""),
            Entitlement(10, "pro", EntitlementKeys.ApiEnabled, "boolean", boolValue: true),

            Entitlement(11, "business", EntitlementKeys.DynamicQrMaxActive, "integer", 100),
            Entitlement(12, "business", EntitlementKeys.ScanQuotaLimit, "integer", 500_000),
            Entitlement(13, "business", EntitlementKeys.ScanQuotaPeriod, "json", null, """{"unit":"month","length":1}"""),
            Entitlement(14, "business", EntitlementKeys.ScanOverQuotaBehavior, "json", null, """{"redirect":"allow","log":"deny"}"""),
            Entitlement(15, "business", EntitlementKeys.ApiEnabled, "boolean", boolValue: true),

            Entitlement(16, "enterprise", EntitlementKeys.DynamicQrMaxActive, "integer", -1),
            Entitlement(17, "enterprise", EntitlementKeys.ScanQuotaLimit, "integer", -1),
            Entitlement(18, "enterprise", EntitlementKeys.ScanQuotaPeriod, "json", null, """{"unit":"year","length":1}"""),
            Entitlement(19, "enterprise", EntitlementKeys.ScanOverQuotaBehavior, "json", null, """{"redirect":"allow","log":"allow"}"""),
            Entitlement(20, "enterprise", EntitlementKeys.ApiEnabled, "boolean", boolValue: true));
    }

    private static PlanEntitlement Entitlement(
        long id,
        string planCode,
        string key,
        string valueType,
        long? intValue = null,
        string? jsonValue = null,
        bool? boolValue = null) =>
        new()
        {
            Id = id,
            PlanCode = planCode,
            EntitlementKey = key,
            ValueType = valueType,
            ValueInt = intValue,
            ValueJson = jsonValue,
            ValueBool = boolValue,
        };
}
