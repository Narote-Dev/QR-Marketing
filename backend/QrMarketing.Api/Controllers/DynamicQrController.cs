using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Controllers;

[ApiController]
[Route("api/dynamic-qr")]
public sealed class DynamicQrController(
    IDynamicQrService dynamicQrService,
    IOptions<DynamicQrOptions> options) : ControllerBase
{
    public const string OwnerTokenHeader = "X-Owner-Token";

    [HttpPost]
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
            var created = await dynamicQrService.CreateAsync(request, cancellationToken);
            return Created($"/api/dynamic-qr/{created.ShortCode}", created);
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

        if (!TryGetOwnerToken(out var token))
        {
            return Unauthorized();
        }

        try
        {
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
