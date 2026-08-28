namespace QrMarketing.Api.Data.Entities;

public sealed class UserSubscription
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string PlanCode { get; set; } = "free";
    public string Status { get; set; } = "active";
    public DateTimeOffset StartedAt { get; set; }
    public DateTimeOffset CurrentPeriodStart { get; set; }
    public DateTimeOffset? CurrentPeriodEnd { get; set; }
    public DateTimeOffset? TrialEndAt { get; set; }
    public DateTimeOffset? GraceEndAt { get; set; }
    public DateTimeOffset? CanceledAt { get; set; }
    public DateTimeOffset? EndedAt { get; set; }
    public bool CancelAtPeriodEnd { get; set; }
    public string? BillingProvider { get; set; }
    public string? BillingExternalId { get; set; }
    public string? PendingPlanCode { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public User? User { get; set; }
    public SubscriptionPlan? Plan { get; set; }
}
