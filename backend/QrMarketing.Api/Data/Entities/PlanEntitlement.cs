namespace QrMarketing.Api.Data.Entities;

public sealed class PlanEntitlement
{
    public long Id { get; set; }
    public string PlanCode { get; set; } = string.Empty;
    public string EntitlementKey { get; set; } = string.Empty;
    public string ValueType { get; set; } = string.Empty;
    public bool? ValueBool { get; set; }
    public long? ValueInt { get; set; }
    public string? ValueJson { get; set; }

    public SubscriptionPlan? Plan { get; set; }
}
