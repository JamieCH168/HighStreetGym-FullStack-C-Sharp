using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighStreetGym.Core.Migrations
{
    /// <inheritdoc />
    public partial class init8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_booking_classes_booking_class_id",
                table: "booking");

            migrationBuilder.DropIndex(
                name: "IX_booking_booking_class_id",
                table: "booking");

            migrationBuilder.CreateTable(
                name: "bookingClass",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    ClassId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bookingClass", x => new { x.BookingId, x.ClassId });
                    table.ForeignKey(
                        name: "FK_bookingClass_booking_BookingId",
                        column: x => x.BookingId,
                        principalTable: "booking",
                        principalColumn: "booking_id");
                    table.ForeignKey(
                        name: "FK_bookingClass_classes_ClassId",
                        column: x => x.ClassId,
                        principalTable: "classes",
                        principalColumn: "class_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_bookingClass_ClassId",
                table: "bookingClass",
                column: "ClassId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bookingClass");

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
        }
    }
}
