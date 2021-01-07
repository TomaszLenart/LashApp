using Microsoft.EntityFrameworkCore.Migrations;

namespace LashApp.Data.Migrations
{
    public partial class ProductQuantityChangeslocationIdfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductQuantityChanges_Products_ProductId",
                table: "ProductQuantityChanges");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "ProductQuantityChanges");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductQuantityChanges",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductQuantityChanges_Products_ProductId",
                table: "ProductQuantityChanges",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductQuantityChanges_Products_ProductId",
                table: "ProductQuantityChanges");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "ProductQuantityChanges",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "ProductQuantityChanges",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductQuantityChanges_Products_ProductId",
                table: "ProductQuantityChanges",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
