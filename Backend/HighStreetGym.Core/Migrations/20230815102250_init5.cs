using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighStreetGym.Core.Migrations
{
    /// <inheritdoc />
    public partial class init5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_blogPost_user_post_user_id",
                table: "blogPost");

            migrationBuilder.DropForeignKey(
                name: "FK_booking_user_booking_user_id",
                table: "booking");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_user_class_trainer_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_class_trainer_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_booking_booking_user_id",
                table: "booking");

            migrationBuilder.DropIndex(
                name: "IX_blogPost_post_user_id",
                table: "blogPost");

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "classes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "blogPost",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_classes_user_id",
                table: "classes",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_booking_user_id",
                table: "booking",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_blogPost_user_id",
                table: "blogPost",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_blogPost_user_user_id",
                table: "blogPost",
                column: "user_id",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_booking_user_user_id",
                table: "booking",
                column: "user_id",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_user_user_id",
                table: "classes",
                column: "user_id",
                principalTable: "user",
                principalColumn: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_blogPost_user_user_id",
                table: "blogPost");

            migrationBuilder.DropForeignKey(
                name: "FK_booking_user_user_id",
                table: "booking");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_user_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_booking_user_id",
                table: "booking");

            migrationBuilder.DropIndex(
                name: "IX_blogPost_user_id",
                table: "blogPost");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "classes");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "booking");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "blogPost");

            migrationBuilder.CreateIndex(
                name: "IX_classes_class_trainer_user_id",
                table: "classes",
                column: "class_trainer_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_booking_booking_user_id",
                table: "booking",
                column: "booking_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_blogPost_post_user_id",
                table: "blogPost",
                column: "post_user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_blogPost_user_post_user_id",
                table: "blogPost",
                column: "post_user_id",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_booking_user_booking_user_id",
                table: "booking",
                column: "booking_user_id",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_user_class_trainer_user_id",
                table: "classes",
                column: "class_trainer_user_id",
                principalTable: "user",
                principalColumn: "user_id");
        }
    }
}
