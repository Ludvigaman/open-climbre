using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class UserWallProgress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProgressLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WallId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Attempts = table.Column<int>(type: "int", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgressLists_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProgressLists_Walls_WallId",
                        column: x => x.WallId,
                        principalTable: "Walls",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgressLists_UserId",
                table: "ProgressLists",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressLists_WallId",
                table: "ProgressLists",
                column: "WallId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProgressLists");
        }
    }
}
