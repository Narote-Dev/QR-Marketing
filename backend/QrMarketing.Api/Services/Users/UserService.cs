using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using QrMarketing.Api.Data;
using QrMarketing.Api.Data.Entities;
using QrMarketing.Api.Services.Entitlements;

namespace QrMarketing.Api.Services.Users;

public interface IUserService
{
    Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken);
    Task<User> GetOrCreateFromClaimsAsync(ClaimsPrincipal principal, CancellationToken cancellationToken);
    Task<User> GetOrCreateDevUserAsync(Guid userId, CancellationToken cancellationToken);
}

public sealed class UserService(QrMarketingDbContext dbContext) : IUserService
{
    public async Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken) =>
        await dbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);

    public async Task<User> GetOrCreateFromClaimsAsync(ClaimsPrincipal principal, CancellationToken cancellationToken)
    {
        // Step 1: Extract Clerk subject and email from JWT claims.
        var authProviderId = principal.FindFirstValue("sub")
            ?? principal.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new InvalidOperationException("JWT is missing subject claim.");
        var email = principal.FindFirstValue(ClaimTypes.Email)
            ?? principal.FindFirstValue("email");

        return await GetOrCreateByAuthProviderIdAsync(authProviderId, email, cancellationToken);
    }

    public Task<User> GetOrCreateDevUserAsync(Guid userId, CancellationToken cancellationToken) =>
        GetOrCreateByAuthProviderIdAsync($"dev:{userId}", $"dev-{userId:N}@localhost", cancellationToken, userId);

    private async Task<User> GetOrCreateByAuthProviderIdAsync(
        string authProviderId,
        string? email,
        CancellationToken cancellationToken,
        Guid? fixedUserId = null)
    {
        // Step 2: Find existing user or create with FREE subscription.
        var existing = await dbContext.Users
            .FirstOrDefaultAsync(x => x.AuthProviderId == authProviderId, cancellationToken);
        if (existing is not null)
        {
            return existing;
        }

        var now = DateTimeOffset.UtcNow;
        var user = new User
        {
            Id = fixedUserId ?? Guid.NewGuid(),
            AuthProviderId = authProviderId,
            Email = email,
            PlanCode = "free",
            Status = "active",
            CreatedAt = now,
            UpdatedAt = now,
        };
        dbContext.Users.Add(user);

        var periodEnd = now.AddYears(1);
        var subscription = new UserSubscription
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            PlanCode = "free",
            Status = SubscriptionStatuses.Active,
            StartedAt = now,
            CurrentPeriodStart = now,
            CurrentPeriodEnd = periodEnd,
            CreatedAt = now,
            UpdatedAt = now,
        };
        dbContext.UserSubscriptions.Add(subscription);

        try
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException
        {
            SqlState: PostgresErrorCodes.UniqueViolation,
            ConstraintName: "IX_users_AuthProviderId",
        })
        {
            // Another first request created this account. SaveChanges rolled back both inserts.
            dbContext.Entry(subscription).State = EntityState.Detached;
            dbContext.Entry(user).State = EntityState.Detached;
            return await dbContext.Users.SingleAsync(x => x.AuthProviderId == authProviderId, cancellationToken);
        }
        return user;
    }
}
