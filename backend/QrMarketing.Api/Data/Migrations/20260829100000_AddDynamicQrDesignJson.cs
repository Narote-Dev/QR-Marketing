using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QrMarketing.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDynamicQrDesignJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DesignJson",
                table: "dynamic_qr",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DesignJson",
                table: "dynamic_qr");
        }
    }
}
