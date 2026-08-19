using Microsoft.EntityFrameworkCore;
namespace QrMarketing.Api.Data;
public sealed class QrMarketingDbContext(DbContextOptions<QrMarketingDbContext> options) : DbContext(options);
