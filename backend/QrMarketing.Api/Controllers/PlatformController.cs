using Microsoft.AspNetCore.Mvc;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Services;

namespace QrMarketing.Api.Controllers;

[ApiController]
[Route("api/platform")]
public sealed class PlatformController(IPlatformHealthService platformHealthService) : ControllerBase
{
    [HttpGet("health")]
    public async Task<ActionResult<PlatformHealthResponse>> GetHealth(CancellationToken cancellationToken) =>
        Ok(await platformHealthService.GetHealthAsync(cancellationToken));
}
