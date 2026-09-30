using ClassificadosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ClassificadosApi.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Classificado> Classificados => Set<Classificado>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Classificado>()
            .HasKey(x => x.Id);

        modelBuilder.Entity<Classificado>()
            .Property(x => x.Titulo)
            .HasMaxLength(80)
            .IsRequired();

        modelBuilder.Entity<Classificado>()
            .Property(x => x.Descricao)
            .HasMaxLength(2500)
            .IsRequired();

        modelBuilder.Entity<Classificado>()
            .Property(x => x.DataCadastro)
            .IsRequired();

        modelBuilder.Entity<Classificado>().HasData(
            new Classificado
            {
                Id = 1,
                Titulo = "Teste 1",
                Descricao = "Descricao teste teste teste",
                DataCadastro = new DateTime(
                    2024, 4, 23, 20, 38, 30,
                    DateTimeKind.Utc)
            },
            new Classificado
            {
                Id = 2,
                Titulo = "Teste 2",
                Descricao = "Teste de descricao",
                DataCadastro = new DateTime(
                    2024, 4, 23, 20, 40, 00,
                    DateTimeKind.Utc)
            }
        );

        modelBuilder.Entity<User>()
            .HasKey(x => x.Id);

        modelBuilder.Entity<User>()
            .Property(x => x.Email)
            .HasMaxLength(256)
            .IsRequired();

        modelBuilder.Entity<User>()
            .HasIndex(x => x.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(x => x.Nome)
            .HasMaxLength(100)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(x => x.PasswordHash)
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(x => x.CreatedAt)
            .IsRequired();
    }
}