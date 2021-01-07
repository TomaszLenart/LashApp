using Microsoft.EntityFrameworkCore.Migrations;

namespace LashApp.Data.Migrations
{
    public partial class UpdateProductremovedquantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Quantity",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
