using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClassificadosApi.Migrations
{
    /// <inheritdoc />
    public partial class ImproveClassificadoModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Descricao",
                table: "Classificados",
                type: "nvarchar(2500)",
                maxLength: 2500,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Classificados",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCadastro",
                value: new DateTime(2024, 4, 23, 20, 38, 30, 0, DateTimeKind.Utc));

            migrationBuilder.UpdateData(
                table: "Classificados",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "DataCadastro", "Descricao" },
                values: new object[] { new DateTime(2024, 4, 23, 20, 40, 0, 0, DateTimeKind.Utc), "Teste de descricao" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Descricao",
                table: "Classificados",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2500)",
                oldMaxLength: 2500);

            migrationBuilder.UpdateData(
                table: "Classificados",
                keyColumn: "Id",
                keyValue: 1,
                column: "DataCadastro",
                value: new DateTime(2024, 4, 23, 20, 38, 30, 911, DateTimeKind.Local).AddTicks(2466));

            migrationBuilder.UpdateData(
                table: "Classificados",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "DataCadastro", "Descricao" },
                values: new object[] { new DateTime(2024, 4, 23, 20, 38, 30, 911, DateTimeKind.Local).AddTicks(2477), "teste Descriao" });
        }
    }
}
