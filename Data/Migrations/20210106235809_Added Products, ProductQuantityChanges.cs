using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LashApp.Data.Migrations
{
    public partial class AddedProductsProductQuantityChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "ProductQuantityChanges",
                columns: table => new
                {
                    ProductQuantityChangeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    IsPurchase = table.Column<bool>(type: "bit", nullable: false),
                    QuantityChange = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductQuantityChanges", x => x.ProductQuantityChangeId);
                    table.ForeignKey(
                        name: "FK_ProductQuantityChanges_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductQuantityChanges_ProductId",
                table: "ProductQuantityChanges",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductQuantityChanges");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
