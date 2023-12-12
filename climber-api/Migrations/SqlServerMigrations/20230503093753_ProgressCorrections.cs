using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class ProgressCorrections : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgressLists_Walls_WallId",
                table: "ProgressLists");

            migrationBuilder.DropIndex(
                name: "IX_ProgressLists_WallId",
                table: "ProgressLists");

            migrationBuilder.AlterColumn<Guid>(
                name: "WallId",
                table: "ProgressLists",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "WallId",
                table: "ProgressLists",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressLists_WallId",
                table: "ProgressLists",
                column: "WallId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgressLists_Walls_WallId",
                table: "ProgressLists",
                column: "WallId",
                principalTable: "Walls",
                principalColumn: "Id");
        }
    }
}
