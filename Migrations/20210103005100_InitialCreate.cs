using Microsoft.EntityFrameworkCore.Migrations;

namespace MyFinancialTracker.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:uuid-ossp", ",,");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
