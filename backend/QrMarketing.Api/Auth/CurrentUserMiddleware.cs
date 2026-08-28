using Microsoft.Extensions.Options;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services.Users;

namespace QrMarketing.Api.Auth;

public sealed class CurrentUserMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(
        HttpContext context,
        IUserService userService,
        IOptions<AuthOptions> authOptions,
        IHostEnvironment environment)
    {
        // Step 1: Optional dev header bypass for local E2E without Clerk.
        var options = authOptions.Value;
        if (environment.IsDevelopment()
            && options.AllowDevUserHeader
            && TryGetDevUserId(context, options.DevUserHeaderName, out var devUserId))
        {
            var devUser = await userService.GetOrCreateDevUserAsync(devUserId, context.RequestAborted);
            context.Items[CurrentUserAccessor.UserIdItemKey] = devUser.Id;
            await next(context);
            return;
        }

        // Step 2: Resolve authenticated JWT user when present.
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var user = await userService.GetOrCreateFromClaimsAsync(context.User, context.RequestAborted);
            context.Items[CurrentUserAccessor.UserIdItemKey] = user.Id;
        }

        await next(context);
    }

    private static bool TryGetDevUserId(HttpContext context, string headerName, out Guid userId)
    {
        userId = default;
        var raw = context.Request.Headers[headerName].FirstOrDefault();
        return !string.IsNullOrWhiteSpace(raw) && Guid.TryParse(raw.Trim(), out userId);
    }
}

public static class CurrentUserMiddlewareExtensions
{
    public static IApplicationBuilder UseCurrentUser(this IApplicationBuilder app) =>
        app.UseMiddleware<CurrentUserMiddleware>();
}
