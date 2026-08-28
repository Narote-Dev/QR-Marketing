namespace QrMarketing.Api.Contracts;

public sealed class QuotaSummaryResponse
{
    public string PlanCode { get; set; } = "free";
    public DynamicQrQuotaResponse DynamicQr { get; set; } = new();
    public ScanQuotaResponse Scans { get; set; } = new();
    public ApiQuotaResponse Api { get; set; } = new();
}

public sealed class DynamicQrQuotaResponse
{
    public long Used { get; set; }
    public long? Limit { get; set; }
    public bool Unlimited { get; set; }
}

public sealed class ScanQuotaResponse
{
    public long Used { get; set; }
    public long? Limit { get; set; }
    public bool Unlimited { get; set; }
    public string PeriodUnit { get; set; } = "year";
    public ScanOverQuotaBehaviorResponse OverQuotaBehavior { get; set; } = new();
}

public sealed class ScanOverQuotaBehaviorResponse
{
    public string Redirect { get; set; } = "allow";
    public string Log { get; set; } = "deny";
}

public sealed class ApiQuotaResponse
{
    public bool Enabled { get; set; }
    public long KeysLimit { get; set; }
}
