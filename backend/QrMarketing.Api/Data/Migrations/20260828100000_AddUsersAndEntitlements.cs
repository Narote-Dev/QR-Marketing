using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace QrMarketing.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUsersAndEntitlements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "subscription_plans",
                columns: table => new
                {
                    Code = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SortOrder = table.Column<int>(type: "integer", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    BillingInterval = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: true),
                    PriceCents = table.Column<int>(type: "integer", nullable: true),
                    Currency = table.Column<string>(type: "char(3)", nullable: true),
                    TrialDays = table.Column<int>(type: "integer", nullable: false),
                    GraceDays = table.Column<int>(type: "integer", nullable: false),
                    MetadataJson = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subscription_plans", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    AuthProviderId = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: true),
                    PlanCode = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false, defaultValue: "free"),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false, defaultValue: "active"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "plan_entitlements",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PlanCode = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    EntitlementKey = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    ValueType = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    ValueBool = table.Column<bool>(type: "boolean", nullable: true),
                    ValueInt = table.Column<long>(type: "bigint", nullable: true),
                    ValueJson = table.Column<string>(type: "text", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_plan_entitlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_plan_entitlements_subscription_plans_PlanCode",
                        column: x => x.PlanCode,
                        principalTable: "subscription_plans",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanCode = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Status = table.Column<string>(type: "character varying(24)", maxLength: 24, nullable: false),
                    StartedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    CurrentPeriodStart = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    CurrentPeriodEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    TrialEndAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    GraceEndAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    CanceledAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    EndedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    CancelAtPeriodEnd = table.Column<bool>(type: "boolean", nullable: false),
                    BillingProvider = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    BillingExternalId = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: true),
                    PendingPlanCode = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_subscriptions_subscription_plans_PlanCode",
                        column: x => x.PlanCode,
                        principalTable: "subscription_plans",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_subscriptions_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_quota_usage",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    QuotaKey = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    PeriodStart = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    PeriodEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UsedAmount = table.Column<long>(type: "bigint", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_quota_usage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_quota_usage_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<long>(
                name: "ScanCountCached",
                table: "dynamic_qr",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "dynamic_qr",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerTokenHash",
                table: "dynamic_qr",
                type: "char(64)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "char(64)");

            migrationBuilder.CreateIndex(
                name: "idx_dynamic_qr_user_id",
                table: "dynamic_qr",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "idx_dynamic_qr_user_status",
                table: "dynamic_qr",
                columns: new[] { "UserId", "IsActive" });

            migrationBuilder.CreateIndex(
                name: "IX_plan_entitlements_PlanCode_EntitlementKey",
                table: "plan_entitlements",
                columns: new[] { "PlanCode", "EntitlementKey" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_user_subscriptions_user_id",
                table: "user_subscriptions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_user_subscriptions_PlanCode",
                table: "user_subscriptions",
                column: "PlanCode");

            migrationBuilder.CreateIndex(
                name: "IX_user_quota_usage_UserId_QuotaKey_PeriodStart",
                table: "user_quota_usage",
                columns: new[] { "UserId", "QuotaKey", "PeriodStart" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_AuthProviderId",
                table: "users",
                column: "AuthProviderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_dynamic_qr_users_UserId",
                table: "dynamic_qr",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id");

            // Change: raw SQL seed — hand-written migration Designer has no InsertData model mapping.
            migrationBuilder.Sql(
                """
                INSERT INTO subscription_plans ("Code", "DisplayName", "SortOrder", "IsPublic", "IsActive", "BillingInterval", "PriceCents", "Currency", "TrialDays", "GraceDays", "MetadataJson", "CreatedAt", "UpdatedAt")
                VALUES
                  ('free', 'Free', 0, TRUE, TRUE, NULL, NULL, NULL, 0, 0, NULL, TIMESTAMPTZ '2026-08-28 00:00:00+00', TIMESTAMPTZ '2026-08-28 00:00:00+00'),
                  ('pro', 'Pro', 1, TRUE, TRUE, 'month', NULL, NULL, 14, 3, NULL, TIMESTAMPTZ '2026-08-28 00:00:00+00', TIMESTAMPTZ '2026-08-28 00:00:00+00'),
                  ('business', 'Business', 2, TRUE, TRUE, 'month', NULL, NULL, 14, 7, NULL, TIMESTAMPTZ '2026-08-28 00:00:00+00', TIMESTAMPTZ '2026-08-28 00:00:00+00'),
                  ('enterprise', 'Enterprise', 3, FALSE, TRUE, 'year', NULL, NULL, 0, 14, NULL, TIMESTAMPTZ '2026-08-28 00:00:00+00', TIMESTAMPTZ '2026-08-28 00:00:00+00')
                ON CONFLICT ("Code") DO NOTHING;

                INSERT INTO plan_entitlements ("Id", "PlanCode", "EntitlementKey", "ValueType", "ValueBool", "ValueInt", "ValueJson")
                VALUES
                  (1, 'free', 'dynamic_qr.max_active', 'integer', NULL, 6, NULL),
                  (2, 'free', 'scan.quota_limit', 'integer', NULL, 7000, NULL),
                  (3, 'free', 'scan.quota_period', 'json', NULL, NULL, '{"unit":"year","length":1}'),
                  (4, 'free', 'scan.over_quota_behavior', 'json', NULL, NULL, '{"redirect":"allow","log":"deny"}'),
                  (5, 'free', 'api.enabled', 'boolean', FALSE, NULL, NULL),
                  (6, 'pro', 'dynamic_qr.max_active', 'integer', NULL, 25, NULL),
                  (7, 'pro', 'scan.quota_limit', 'integer', NULL, 100000, NULL),
                  (8, 'pro', 'scan.quota_period', 'json', NULL, NULL, '{"unit":"month","length":1}'),
                  (9, 'pro', 'scan.over_quota_behavior', 'json', NULL, NULL, '{"redirect":"allow","log":"deny"}'),
                  (10, 'pro', 'api.enabled', 'boolean', TRUE, NULL, NULL),
                  (11, 'business', 'dynamic_qr.max_active', 'integer', NULL, 100, NULL),
                  (12, 'business', 'scan.quota_limit', 'integer', NULL, 500000, NULL),
                  (13, 'business', 'scan.quota_period', 'json', NULL, NULL, '{"unit":"month","length":1}'),
                  (14, 'business', 'scan.over_quota_behavior', 'json', NULL, NULL, '{"redirect":"allow","log":"deny"}'),
                  (15, 'business', 'api.enabled', 'boolean', TRUE, NULL, NULL),
                  (16, 'enterprise', 'dynamic_qr.max_active', 'integer', NULL, -1, NULL),
                  (17, 'enterprise', 'scan.quota_limit', 'integer', NULL, -1, NULL),
                  (18, 'enterprise', 'scan.quota_period', 'json', NULL, NULL, '{"unit":"year","length":1}'),
                  (19, 'enterprise', 'scan.over_quota_behavior', 'json', NULL, NULL, '{"redirect":"allow","log":"allow"}'),
                  (20, 'enterprise', 'api.enabled', 'boolean', TRUE, NULL, NULL)
                ON CONFLICT ("PlanCode", "EntitlementKey") DO NOTHING;

                SELECT setval(
                    pg_get_serial_sequence('plan_entitlements', 'Id'),
                    (SELECT COALESCE(MAX("Id"), 1) FROM plan_entitlements));
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dynamic_qr_users_UserId",
                table: "dynamic_qr");

            migrationBuilder.DropTable(
                name: "plan_entitlements");

            migrationBuilder.DropTable(
                name: "user_quota_usage");

            migrationBuilder.DropTable(
                name: "user_subscriptions");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "subscription_plans");

            migrationBuilder.DropIndex(
                name: "idx_dynamic_qr_user_id",
                table: "dynamic_qr");

            migrationBuilder.DropIndex(
                name: "idx_dynamic_qr_user_status",
                table: "dynamic_qr");

            migrationBuilder.DropColumn(
                name: "ScanCountCached",
                table: "dynamic_qr");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "dynamic_qr");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerTokenHash",
                table: "dynamic_qr",
                type: "char(64)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "char(64)",
                oldNullable: true);
        }
    }
}
