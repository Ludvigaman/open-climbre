using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class ModelChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Anchor",
                table: "Walls",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Walls",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Walls",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RatingId",
                table: "Walls",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Removed",
                table: "Walls",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Type",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TypeName = table.Column<int>(type: "int", nullable: false),
                    WallId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Type", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Type_Walls_WallId",
                        column: x => x.WallId,
                        principalTable: "Walls",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRating",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorId = table.Column<int>(type: "int", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rate = table.Column<int>(type: "int", nullable: false),
                    RatingId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRating_Ratings_RatingId",
                        column: x => x.RatingId,
                        principalTable: "Ratings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserRating_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Walls_RatingId",
                table: "Walls",
                column: "RatingId");

            migrationBuilder.CreateIndex(
                name: "IX_Type_WallId",
                table: "Type",
                column: "WallId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_AuthorId",
                table: "UserRating",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_RatingId",
                table: "UserRating",
                column: "RatingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Walls_Ratings_RatingId",
                table: "Walls",
                column: "RatingId",
                principalTable: "Ratings",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Walls_Ratings_RatingId",
                table: "Walls");

            migrationBuilder.DropTable(
                name: "Type");

            migrationBuilder.DropTable(
                name: "UserRating");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Walls_RatingId",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "Anchor",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "RatingId",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "Removed",
                table: "Walls");
        }
    }
}
