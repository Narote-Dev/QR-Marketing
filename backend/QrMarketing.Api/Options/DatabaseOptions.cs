namespace QrMarketing.Api.Options;

public sealed class DatabaseOptions
{
    public const string SectionName = "Database";

    /// <summary>Apply EF migrations on API startup (local Docker / Railway).</summary>
    public bool MigrateOnStartup { get; set; } = true;
}
