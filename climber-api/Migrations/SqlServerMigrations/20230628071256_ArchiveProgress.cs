using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations.SqlServerMigrations
{
    public partial class ArchiveProgress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Archived",
                table: "ProgressLists",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Archived",
                table: "ProgressLists");
        }
    }
}
