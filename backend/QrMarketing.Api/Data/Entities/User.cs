namespace QrMarketing.Api.Data.Entities;

public sealed class User
{
    public Guid Id { get; set; }
    public string AuthProviderId { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string PlanCode { get; set; } = "free";
    public string Status { get; set; } = "active";
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public ICollection<DynamicQr> DynamicQrs { get; set; } = new List<DynamicQr>();
    public ICollection<UserSubscription> Subscriptions { get; set; } = new List<UserSubscription>();
    public ICollection<UserQuotaUsage> QuotaUsages { get; set; } = new List<UserQuotaUsage>();
}
