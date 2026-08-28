using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;
using QrMarketing.Api.Services.Users;

namespace QrMarketing.Api.Controllers;

[ApiController]
[Route("api/dynamic-qr")]
public sealed class DynamicQrController(
    IDynamicQrService dynamicQrService,
    ICurrentUserAccessor currentUser,
    IOptions<DynamicQrOptions> options) : ControllerBase
{
    public const string OwnerTokenHeader = "X-Owner-Token";

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DynamicQrListItemResponse>>> List(CancellationToken cancellationToken)
    {
        if (!options.Value.Enabled)
        {
            return NotFound();
        }

        if (currentUser.UserId is not Guid userId)
        {
            return Unauthorized(new { error = "auth.required", message = "Authentication is required." });
        }

        var items = await dynamicQrService.ListForUserAsync(userId, cancellationToken);
        return Ok(items);
    }

    [HttpPost]
    [EnableRateLimiting("api-write")]
    public async Task<ActionResult<CreateDynamicQrResponse>> Create(
        [FromBody] CreateDynamicQrRequest request,
        CancellationToken cancellationToken)
    {
        if (!options.Value.Enabled)
        {
            return NotFound();
        }

        try
        {
            // Step 1: Prefer authenticated user create when JWT/dev header present.
            if (currentUser.UserId is Guid userId)
            {
                var createdForUser = await dynamicQrService.CreateForUserAsync(request, userId, cancellationToken);
                return Created($"/api/dynamic-qr/{createdForUser.ShortCode}", createdForUser);
            }

            // Step 2: Legacy owner-token flow for local MVP only.
            if (!options.Value.AllowLegacyOwnerToken)
            {
                return Unauthorized(new { error = "auth.required", message = "Authentication is required." });
            }

            var created = await dynamicQrService.CreateAsync(request, cancellationToken);
            return Created($"/api/dynamic-qr/{created.ShortCode}", created);
        }
        catch (QuotaExceededException ex)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new
            {
                error = ex.Result.ErrorCode,
                message = ex.Result.Message,
                limit = ex.Result.Limit,
                used = ex.Result.Used,
                upgradePlan = ex.Result.UpgradePlan,
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{shortCode}")]
    public async Task<ActionResult<DynamicQrDetailsResponse>> Get(
        string shortCode,
        CancellationToken cancellationToken)
    {
        if (!options.Value.Enabled)
        {
            return NotFound();
        }

        if (currentUser.UserId is Guid userId)
        {
            var byUser = await dynamicQrService.GetForUserAsync(shortCode, userId, cancellationToken);
            return byUser is null ? NotFound() : Ok(byUser);
        }

        if (!TryGetOwnerToken(out var token))
        {
            return Unauthorized();
        }

        var details = await dynamicQrService.GetAsync(shortCode, token, cancellationToken);
        return details is null ? NotFound() : Ok(details);
    }

    [HttpPatch("{shortCode}")]
    public async Task<ActionResult<DynamicQrDetailsResponse>> Update(
        string shortCode,
        [FromBody] UpdateDynamicQrRequest request,
        CancellationToken cancellationToken)
    {
        if (!options.Value.Enabled)
        {
            return NotFound();
        }

        try
        {
            if (currentUser.UserId is Guid userId)
            {
                var updatedForUser = await dynamicQrService.UpdateForUserAsync(shortCode, userId, request, cancellationToken);
                return updatedForUser is null ? NotFound() : Ok(updatedForUser);
            }

            if (!TryGetOwnerToken(out var token))
            {
                return Unauthorized();
            }

            var updated = await dynamicQrService.UpdateAsync(shortCode, token, request, cancellationToken);
            return updated is null ? NotFound() : Ok(updated);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("{shortCode}/stats")]
    public async Task<ActionResult<DynamicQrStatsResponse>> Stats(
        string shortCode,
        CancellationToken cancellationToken)
    {
        if (!options.Value.Enabled)
        {
            return NotFound();
        }

        if (currentUser.UserId is Guid userId)
        {
            var statsForUser = await dynamicQrService.GetStatsForUserAsync(shortCode, userId, cancellationToken);
            return statsForUser is null ? NotFound() : Ok(statsForUser);
        }

        if (!TryGetOwnerToken(out var token))
        {
            return Unauthorized();
        }

        var stats = await dynamicQrService.GetStatsAsync(shortCode, token, cancellationToken);
        return stats is null ? NotFound() : Ok(stats);
    }

    private bool TryGetOwnerToken(out string token)
    {
        token = Request.Headers[OwnerTokenHeader].FirstOrDefault() ?? string.Empty;
        return !string.IsNullOrWhiteSpace(token);
    }
}
