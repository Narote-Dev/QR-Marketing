namespace QrMarketing.Api.Data.Entities;

public sealed class UserQuotaUsage
{
    public long Id { get; set; }
    public Guid UserId { get; set; }
    public string QuotaKey { get; set; } = string.Empty;
    public DateTimeOffset PeriodStart { get; set; }
    public DateTimeOffset PeriodEnd { get; set; }
    public long UsedAmount { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public User? User { get; set; }
}
