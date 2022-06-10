using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bankApi.Migrations
{
    public partial class Transctions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    clientId = table.Column<int>(type: "integer", nullable: false),
                    AccBalance = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.clientId);
                    table.ForeignKey(
                        name: "FK_Transactions_BankModels_clientId",
                        column: x => x.clientId,
                        principalTable: "BankModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
