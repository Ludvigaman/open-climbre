using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class FixedGrade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Walls_Grades_GradeId",
                table: "Walls");

            migrationBuilder.DropTable(
                name: "Grades");

            migrationBuilder.DropTable(
                name: "Type");

            migrationBuilder.DropIndex(
                name: "IX_Walls_GradeId",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "GradeId",
                table: "Walls");

            migrationBuilder.AddColumn<int>(
                name: "Grade",
                table: "Walls",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TypesJSON",
                table: "Walls",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "Walls");

            migrationBuilder.DropColumn(
                name: "TypesJSON",
                table: "Walls");

            migrationBuilder.AddColumn<Guid>(
                name: "GradeId",
                table: "Walls",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Grades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grades", x => x.Id);
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

            migrationBuilder.CreateIndex(
                name: "IX_Walls_GradeId",
                table: "Walls",
                column: "GradeId");

            migrationBuilder.CreateIndex(
                name: "IX_Type_WallId",
                table: "Type",
                column: "WallId");

            migrationBuilder.AddForeignKey(
                name: "FK_Walls_Grades_GradeId",
                table: "Walls",
                column: "GradeId",
                principalTable: "Grades",
                principalColumn: "Id");
        }
    }
}
