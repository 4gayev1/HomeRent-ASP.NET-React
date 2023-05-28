using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeRent.Migrations
{
    /// <inheritdoc />
    public partial class alma : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blok",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blok", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Contract",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Menzil_id = table.Column<int>(type: "int", nullable: false),
                    BashlamaTarix = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BitmeTarix = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    soyad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    qiymet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contract", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Flat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Blok_id = table.Column<int>(type: "int", nullable: false),
                    Nomresi = table.Column<int>(type: "int", nullable: false),
                    OtaqSayi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    kv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Qiymet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flat", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blok");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Contract");

            migrationBuilder.DropTable(
                name: "Flat");
        }
    }
}
