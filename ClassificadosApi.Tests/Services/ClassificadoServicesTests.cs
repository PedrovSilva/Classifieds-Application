using ClassificadosApi.Context;
using ClassificadosApi.DTOs;
using ClassificadosApi.Models;
using ClassificadosApi.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace ClassificadosApi.Tests.Services;

public class ClassificadoServicesTests
{
    private static AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task CreateClassificado_DeveCriarClassificado()
    {
        await using var context = CreateContext();

        var service = new ClassificadoServices(context);

        var dto = new ClassificadoCreateDto
        {
            Titulo = "Notebook usado",
            Descricao = "Notebook em bom estado, com 8GB de RAM e 256GB de armazenamento"
        };

        var result = await service.CreateClassificado(dto);

        Assert.NotNull(result);
        Assert.Equal(dto.Titulo, result.Titulo);
        Assert.Equal(dto.Descricao, result.Descricao);
        Assert.Single(context.Classificados);
    }

    [Fact]
public async Task GetClassificado_DeveRetornarClassificadoExistente()
{
    await using var context = CreateContext();

    var classificado = new Classificado
    {
        Titulo = "Celular",
        Descricao = "Celular usado",
        DataCadastro = DateTime.UtcNow
    };

    context.Classificados.Add(classificado);
    await context.SaveChangesAsync();

    var service = new ClassificadoServices(context);

    var result = await service.GetClassificado(classificado.Id);

    Assert.NotNull(result);
    Assert.Equal("Celular", result.Titulo);
    Assert.Equal("Celular usado", result.Descricao);
    Assert.Equal(classificado.DataCadastro, result.DataCadastro);
}
[Fact]
public async Task GetClassificado_DeveRetornarNull_QuandoNaoExistir()
{
    await using var context = CreateContext();

    var service = new ClassificadoServices(context);

    var result = await service.GetClassificado(999);

    Assert.Null(result);
}
[Fact]
public async Task UpdateClassificado_DeveAtualizarDados()
{
    await using var context = CreateContext();

    var classificado = new Classificado
    {
        Titulo = "Título antigo",
        Descricao = "Descrição antiga",
        DataCadastro = DateTime.UtcNow
    };

    context.Classificados.Add(classificado);
    await context.SaveChangesAsync();

    var service = new ClassificadoServices(context);

    var dto = new ClassificadoUpdateDto
    {
        Titulo = "Título novo",
        Descricao = "Descrição nova"
    };

    var result = await service.UpdateClassificado(
        classificado.Id,
        dto
    );

    Assert.NotNull(result);
    Assert.Equal("Título novo", result.Titulo);
    Assert.Equal("Descrição nova", result.Descricao);
}
[Fact]
public async Task UpdateClassificado_DeveRetornarNull_QuandoNaoExistir()
{
    await using var context = CreateContext();

    var service = new ClassificadoServices(context);

    var dto = new ClassificadoUpdateDto
    {
        Titulo = "Título",
        Descricao = "Descrição"
    };

    var result = await service.UpdateClassificado(
        999,
        dto
    );

    Assert.Null(result);
}
[Fact]
public async Task DeleteClassificado_DeveExcluirClassificado()
{
    await using var context = CreateContext();

    var classificado = new Classificado
    {
        Titulo = "Excluir",
        Descricao = "Será excluído",
        DataCadastro = DateTime.UtcNow
    };

    context.Classificados.Add(classificado);
    await context.SaveChangesAsync();

    var service = new ClassificadoServices(context);

    var result = await service.DeleteClassificado(
        classificado.Id
    );

    Assert.True(result);
    Assert.Empty(context.Classificados);
}
[Fact]
public async Task DeleteClassificado_DeveRetornarFalse_QuandoNaoExistir()
{
    await using var context = CreateContext();

    var service = new ClassificadoServices(context);

    var result = await service.DeleteClassificado(999);

    Assert.False(result);
}
[Fact]
public async Task GetClassificadosByData_DeveRetornarPaginaCorreta()
{
    await using var context = CreateContext();

    for (var i = 1; i <= 25; i++)
    {
        context.Classificados.Add(new Classificado
        {
            Titulo = $"Classificado {i}",
            Descricao = $"Descrição {i}",
            DataCadastro = DateTime.UtcNow.AddMinutes(-i)
        });
    }

    await context.SaveChangesAsync();

    var service = new ClassificadoServices(context);

    var result = await service.GetClassificadosByData(
        page: 2,
        pageSize: 10
    );

    Assert.Equal(2, result.Page);
    Assert.Equal(10, result.PageSize);
    Assert.Equal(25, result.TotalItems);
    Assert.Equal(3, result.TotalPages);
    Assert.Equal(10, result.Items.Count);
}
}