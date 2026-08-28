namespace QrMarketing.Api.Services.Entitlements;

public static class EntitlementKeys
{
    public const string DynamicQrMaxActive = "dynamic_qr.max_active";
    public const string ScanQuotaLimit = "scan.quota_limit";
    public const string ScanQuotaPeriod = "scan.quota_period";
    public const string ScanOverQuotaBehavior = "scan.over_quota_behavior";
    public const string ApiEnabled = "api.enabled";
}

public static class QuotaKeys
{
    public const string ScanLogged = "scan.logged";
}

public static class SubscriptionStatuses
{
    public const string Active = "active";
    public const string Trialing = "trialing";
    public const string PastDue = "past_due";
    public const string Grace = "grace";
}
