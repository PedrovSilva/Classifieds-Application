using System.ComponentModel.DataAnnotations;

namespace ClassificadosApi.Models;

public class Classificado
{
    public int Id { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;

    public DateTime DataCadastro { get; set; }
}