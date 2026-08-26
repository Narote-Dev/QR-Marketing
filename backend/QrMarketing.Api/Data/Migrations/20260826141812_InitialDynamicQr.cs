using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace QrMarketing.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialDynamicQr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dynamic_qr",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    ShortCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    OwnerTokenHash = table.Column<string>(type: "char(64)", nullable: false),
                    DestinationUrl = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: false),
                    Label = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dynamic_qr", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "scan_events",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QrId = table.Column<Guid>(type: "uuid", nullable: false),
                    ScannedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    DeviceType = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Country = table.Column<string>(type: "char(2)", nullable: true),
                    Referrer = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_scan_events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_scan_events_dynamic_qr_QrId",
                        column: x => x.QrId,
                        principalTable: "dynamic_qr",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "idx_dynamic_qr_owner_token_hash",
                table: "dynamic_qr",
                column: "OwnerTokenHash");

            migrationBuilder.CreateIndex(
                name: "IX_dynamic_qr_ShortCode",
                table: "dynamic_qr",
                column: "ShortCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_scan_events_qr_id_time",
                table: "scan_events",
                columns: new[] { "QrId", "ScannedAt" },
                descending: new[] { false, true });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "scan_events");

            migrationBuilder.DropTable(
                name: "dynamic_qr");
        }
    }
}
