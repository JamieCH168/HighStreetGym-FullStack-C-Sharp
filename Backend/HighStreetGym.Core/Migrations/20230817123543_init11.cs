using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighStreetGym.Core.Migrations
{
    /// <inheritdoc />
    public partial class init11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "user_authentication_key",
                table: "user");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "user_authentication_key",
                table: "user",
                type: "nvarchar(145)",
                maxLength: 145,
                nullable: false,
                defaultValue: "");
        }
    }
}
