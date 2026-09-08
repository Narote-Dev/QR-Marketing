using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using QrMarketing.Api.Data;

namespace QrMarketing.Api.Services;

internal static class UserQuotaTransaction
{
    // A database row lock coordinates all API replicas without schema changes.
    // InMemory is retained only for existing unit tests, never concurrency validation.
    public static async Task<IDbContextTransaction?> BeginAsync(
        QrMarketingDbContext db, Guid? userId, CancellationToken cancellationToken)
    {
        if (!db.Database.IsNpgsql()) return null;
        var transaction = await db.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            if (userId is Guid id)
            {
                await db.Database.ExecuteSqlInterpolatedAsync(
                    $"SELECT 1 FROM users WHERE \"Id\" = {id} FOR UPDATE", cancellationToken);
            }
            return transaction;
        }
        catch
        {
            await transaction.DisposeAsync();
            throw;
        }
    }
}
