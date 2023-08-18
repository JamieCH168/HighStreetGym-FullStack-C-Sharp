using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighStreetGym.Core.Migrations
{
    /// <inheritdoc />
    public partial class init7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_booking_classes_class_id",
                table: "booking");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_activity_activity_id",
                table: "classes");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_room_room_id",
                table: "classes");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_user_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_activity_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_room_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_booking_class_id",
                table: "booking");

            migrationBuilder.DropColumn(
                name: "activity_id",
                table: "classes");

            migrationBuilder.DropColumn(
                name: "room_id",
                table: "classes");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "classes");

            migrationBuilder.DropColumn(
                name: "class_id",
                table: "booking");

            migrationBuilder.CreateIndex(
                name: "IX_classes_class_activity_id",
                table: "classes",
                column: "class_activity_id");

            migrationBuilder.CreateIndex(
                name: "IX_classes_class_room_id",
                table: "classes",
                column: "class_room_id");

            migrationBuilder.CreateIndex(
                name: "IX_classes_class_trainer_user_id",
                table: "classes",
                column: "class_trainer_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_booking_booking_class_id",
                table: "booking",
                column: "booking_class_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_booking_classes_booking_class_id",
                table: "booking",
                column: "booking_class_id",
                principalTable: "classes",
                principalColumn: "class_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_activity_class_activity_id",
                table: "classes",
                column: "class_activity_id",
                principalTable: "activity",
                principalColumn: "activity_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_room_class_room_id",
                table: "classes",
                column: "class_room_id",
                principalTable: "room",
                principalColumn: "room_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_user_class_trainer_user_id",
                table: "classes",
                column: "class_trainer_user_id",
                principalTable: "user",
                principalColumn: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_booking_classes_booking_class_id",
                table: "booking");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_activity_class_activity_id",
                table: "classes");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_room_class_room_id",
                table: "classes");

            migrationBuilder.DropForeignKey(
                name: "FK_classes_user_class_trainer_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_class_activity_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_class_room_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_classes_class_trainer_user_id",
                table: "classes");

            migrationBuilder.DropIndex(
                name: "IX_booking_booking_class_id",
                table: "booking");

            migrationBuilder.AddColumn<int>(
                name: "activity_id",
                table: "classes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "room_id",
                table: "classes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "classes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "class_id",
                table: "booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_classes_activity_id",
                table: "classes",
                column: "activity_id");

            migrationBuilder.CreateIndex(
                name: "IX_classes_room_id",
                table: "classes",
                column: "room_id");

            migrationBuilder.CreateIndex(
                name: "IX_classes_user_id",
                table: "classes",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_booking_class_id",
                table: "booking",
                column: "class_id");

            migrationBuilder.AddForeignKey(
                name: "FK_booking_classes_class_id",
                table: "booking",
                column: "class_id",
                principalTable: "classes",
                principalColumn: "class_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_activity_activity_id",
                table: "classes",
                column: "activity_id",
                principalTable: "activity",
                principalColumn: "activity_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_room_room_id",
                table: "classes",
                column: "room_id",
                principalTable: "room",
                principalColumn: "room_id");

            migrationBuilder.AddForeignKey(
                name: "FK_classes_user_user_id",
                table: "classes",
                column: "user_id",
                principalTable: "user",
                principalColumn: "user_id");
        }
    }
}
