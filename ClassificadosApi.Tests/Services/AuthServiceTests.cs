using ClassificadosApi.Context;
using ClassificadosApi.DTOs;
using ClassificadosApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace ClassificadosApi.Tests.Services;

public class AuthServiceTests
{
    private static AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    private static IConfiguration CreateConfiguration()
    {
        return new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:Key"] = "ClassificadosTestSecretKey_AtLeast32Characters!",
                ["Jwt:Issuer"] = "ClassificadosApi",
                ["Jwt:Audience"] = "ClassificadosApp",
                ["Jwt:ExpirationMinutes"] = "60"
            })
            .Build();
    }

    [Fact]
    public async Task RegisterAsync_DeveCriarUsuarioERetornarToken()
    {
        await using var context = CreateContext();
        var service = new AuthService(context, CreateConfiguration());

        var result = await service.RegisterAsync(new RegisterDto
        {
            Nome = "Pedro Silva",
            Email = "pedro@example.com",
            Password = "senha123"
        });

        Assert.NotNull(result);
        Assert.Equal("Pedro Silva", result.Nome);
        Assert.Equal("pedro@example.com", result.Email);
        Assert.False(string.IsNullOrWhiteSpace(result.Token));
        Assert.Single(context.Users);
    }

    [Fact]
    public async Task RegisterAsync_DeveRetornarNull_QuandoEmailJaExiste()
    {
        await using var context = CreateContext();
        var service = new AuthService(context, CreateConfiguration());

        await service.RegisterAsync(new RegisterDto
        {
            Nome = "Pedro Silva",
            Email = "pedro@example.com",
            Password = "senha123"
        });

        var result = await service.RegisterAsync(new RegisterDto
        {
            Nome = "Outro Usuário",
            Email = "pedro@example.com",
            Password = "outraSenha"
        });

        Assert.Null(result);
        Assert.Single(context.Users);
    }

    [Fact]
    public async Task LoginAsync_DeveAutenticarComCredenciaisValidas()
    {
        await using var context = CreateContext();
        var service = new AuthService(context, CreateConfiguration());

        await service.RegisterAsync(new RegisterDto
        {
            Nome = "Pedro Silva",
            Email = "pedro@example.com",
            Password = "senha123"
        });

        var result = await service.LoginAsync(new LoginDto
        {
            Email = "pedro@example.com",
            Password = "senha123"
        });

        Assert.NotNull(result);
        Assert.Equal("pedro@example.com", result.Email);
        Assert.False(string.IsNullOrWhiteSpace(result.Token));
    }

    [Fact]
    public async Task LoginAsync_DeveRetornarNull_QuandoSenhaInvalida()
    {
        await using var context = CreateContext();
        var service = new AuthService(context, CreateConfiguration());

        await service.RegisterAsync(new RegisterDto
        {
            Nome = "Pedro Silva",
            Email = "pedro@example.com",
            Password = "senha123"
        });

        var result = await service.LoginAsync(new LoginDto
        {
            Email = "pedro@example.com",
            Password = "senhaErrada"
        });

        Assert.Null(result);
    }

    [Fact]
    public async Task LoginAsync_DeveRetornarNull_QuandoUsuarioNaoExiste()
    {
        await using var context = CreateContext();
        var service = new AuthService(context, CreateConfiguration());

        var result = await service.LoginAsync(new LoginDto
        {
            Email = "naoexiste@example.com",
            Password = "senha123"
        });

        Assert.Null(result);
    }
}
