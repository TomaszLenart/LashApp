using Microsoft.EntityFrameworkCore.Migrations;

namespace LashApp.Data.Migrations
{
    public partial class TreatmentsupdateDateHour : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "To",
                table: "Appointments",
                newName: "Hour");

            migrationBuilder.RenameColumn(
                name: "From",
                table: "Appointments",
                newName: "Date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Hour",
                table: "Appointments",
                newName: "To");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Appointments",
                newName: "From");
        }
    }
}
