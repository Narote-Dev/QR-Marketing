using QrMarketing.Api.Data.Entities;

namespace QrMarketing.Api.Services.Users;

public interface ICurrentUserAccessor
{
    Guid? UserId { get; }
    bool IsAuthenticated { get; }
}

public sealed class CurrentUserAccessor(IHttpContextAccessor httpContextAccessor) : ICurrentUserAccessor
{
    public const string UserIdItemKey = "CurrentUserId";

    public Guid? UserId
    {
        get
        {
            var value = httpContextAccessor.HttpContext?.Items[UserIdItemKey];
            return value is Guid guid ? guid : null;
        }
    }

    public bool IsAuthenticated => UserId is not null;
}
