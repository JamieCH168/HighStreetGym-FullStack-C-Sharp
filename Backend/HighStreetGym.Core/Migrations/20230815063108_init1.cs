using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HighStreetGym.Core.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "activity",
                columns: table => new
                {
                    activity_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    activity_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    activity_description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    activity_duration = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_activity", x => x.activity_id);
                });

            migrationBuilder.CreateTable(
                name: "room",
                columns: table => new
                {
                    room_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    room_location = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    room_number = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_room", x => x.room_id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_email = table.Column<string>(type: "nvarchar(95)", maxLength: 95, nullable: false),
                    user_password = table.Column<string>(type: "nvarchar(195)", maxLength: 195, nullable: false),
                    user_access_role = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    user_phone = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    user_first_name = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    user_last_name = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    user_address = table.Column<string>(type: "nvarchar(65)", maxLength: 65, nullable: false),
                    user_authentication_key = table.Column<string>(type: "nvarchar(145)", maxLength: 145, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "blogPost",
                columns: table => new
                {
                    post_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    post_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    post_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    post_user_id = table.Column<int>(type: "int", nullable: false),
                    post_title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    post_content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blogPost", x => x.post_id);
                    table.ForeignKey(
                        name: "FK_blogPost_user_post_user_id",
                        column: x => x.post_user_id,
                        principalTable: "user",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "classes",
                columns: table => new
                {
                    class_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    class_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    class_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    class_room_id = table.Column<int>(type: "int", nullable: false),
                    class_activity_id = table.Column<int>(type: "int", nullable: false),
                    class_trainer_user_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_classes", x => x.class_id);
                    table.ForeignKey(
                        name: "FK_classes_activity_class_activity_id",
                        column: x => x.class_activity_id,
                        principalTable: "activity",
                        principalColumn: "activity_id");
                    table.ForeignKey(
                        name: "FK_classes_room_class_room_id",
                        column: x => x.class_room_id,
                        principalTable: "room",
                        principalColumn: "room_id");
                    table.ForeignKey(
                        name: "FK_classes_user_class_trainer_user_id",
                        column: x => x.class_trainer_user_id,
                        principalTable: "user",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "booking",
                columns: table => new
                {
                    booking_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    booking_user_id = table.Column<int>(type: "int", nullable: false),
                    booking_class_id = table.Column<int>(type: "int", nullable: false),
                    booking_created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    booking_created_time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_booking", x => x.booking_id);
                    table.ForeignKey(
                        name: "FK_booking_classes_booking_class_id",
                        column: x => x.booking_class_id,
                        principalTable: "classes",
                        principalColumn: "class_id");
                    table.ForeignKey(
                        name: "FK_booking_user_booking_user_id",
                        column: x => x.booking_user_id,
                        principalTable: "user",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_blogPost_post_user_id",
                table: "blogPost",
                column: "post_user_id");

            migrationBuilder.CreateIndex(
                name: "IX_booking_booking_class_id",
                table: "booking",
                column: "booking_class_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_booking_booking_user_id",
                table: "booking",
                column: "booking_user_id");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "blogPost");

            migrationBuilder.DropTable(
                name: "booking");

            migrationBuilder.DropTable(
                name: "classes");

            migrationBuilder.DropTable(
                name: "activity");

            migrationBuilder.DropTable(
                name: "room");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
