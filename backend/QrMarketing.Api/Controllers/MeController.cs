using Microsoft.AspNetCore.Mvc;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Services.Entitlements;
using QrMarketing.Api.Services.Users;

namespace QrMarketing.Api.Controllers;

[ApiController]
[Route("api/me")]
public sealed class MeController(
    ICurrentUserAccessor currentUser,
    IEntitlementService entitlementService) : ControllerBase
{
    [HttpGet("quota")]
    public async Task<ActionResult<QuotaSummaryResponse>> GetQuota(CancellationToken cancellationToken)
    {
        if (currentUser.UserId is not Guid userId)
        {
            return Unauthorized(new { error = "auth.required", message = "Authentication is required." });
        }

        var summary = await entitlementService.GetQuotaSummaryAsync(userId, cancellationToken);
        return Ok(new QuotaSummaryResponse
        {
            PlanCode = summary.PlanCode,
            DynamicQr = new DynamicQrQuotaResponse
            {
                Used = summary.DynamicQr.Used,
                Limit = summary.DynamicQr.Limit,
                Unlimited = summary.DynamicQr.Unlimited,
            },
            Scans = new ScanQuotaResponse
            {
                Used = summary.Scans.Used,
                Limit = summary.Scans.Limit,
                Unlimited = summary.Scans.Unlimited,
                PeriodUnit = summary.Scans.PeriodUnit,
                OverQuotaBehavior = new ScanOverQuotaBehaviorResponse
                {
                    Redirect = summary.Scans.OverQuotaBehavior.Redirect,
                    Log = summary.Scans.OverQuotaBehavior.Log,
                },
            },
            Api = new ApiQuotaResponse
            {
                Enabled = summary.Api.Enabled,
                KeysLimit = summary.Api.KeysLimit,
            },
        });
    }
}
