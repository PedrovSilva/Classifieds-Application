using System.ComponentModel.DataAnnotations;

namespace ClassificadosApi.DTOs;

public sealed class ClassificadoUpdateDto
{
    [Required]
    [StringLength(80, MinimumLength = 3)]
    public string Titulo { get; set; } = string.Empty;

    [Required]
    [StringLength(2500, MinimumLength = 3)]
    public string Descricao { get; set; } = string.Empty;
}