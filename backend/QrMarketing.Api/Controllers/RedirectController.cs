using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Controllers;

[ApiController]
[Route("r")]
public sealed class RedirectController(
    IDynamicQrService dynamicQrService,
    IOptions<DynamicQrOptions> options) : ControllerBase
{
    [HttpGet("{shortCode}")]
    [EnableRateLimiting("redirect")]
    public async Task<IActionResult> RedirectToDestination(string shortCode, CancellationToken cancellationToken)
    {
        // Redirect stays available when feature is enabled so printed staging codes work.
        if (!options.Value.Enabled)
        {
            return NotFound();
        }

        var userAgent = Request.Headers.UserAgent.ToString();
        var country = Request.Headers["CF-IPCountry"].FirstOrDefault()
            ?? Request.Headers["X-Country-Code"].FirstOrDefault();
        var referrer = Request.Headers.Referer.ToString();

        var resolution = await dynamicQrService.ResolveRedirectAsync(
            shortCode,
            userAgent,
            country,
            string.IsNullOrWhiteSpace(referrer) ? null : referrer,
            cancellationToken);

        if (resolution is null)
        {
            return StatusCode(StatusCodes.Status410Gone);
        }

        if (resolution.QuotaExceeded)
        {
            Response.Headers["X-QR-Quota-Exceeded"] = "1";
        }

        return Redirect(resolution.DestinationUrl);
    }
}
