using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class UpdatedUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Walls_Users_AuthorId",
                table: "Walls");

            migrationBuilder.DropIndex(
                name: "IX_Walls_AuthorId",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Walls");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Walls",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Walls");

            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Walls",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Walls_AuthorId",
                table: "Walls",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Walls_Users_AuthorId",
                table: "Walls",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
