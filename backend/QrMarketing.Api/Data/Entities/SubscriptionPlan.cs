namespace QrMarketing.Api.Data.Entities;

public sealed class SubscriptionPlan
{
    public string Code { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsPublic { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public string? BillingInterval { get; set; }
    public int? PriceCents { get; set; }
    public string? Currency { get; set; }
    public int TrialDays { get; set; }
    public int GraceDays { get; set; }
    public string? MetadataJson { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public ICollection<PlanEntitlement> Entitlements { get; set; } = new List<PlanEntitlement>();
}
