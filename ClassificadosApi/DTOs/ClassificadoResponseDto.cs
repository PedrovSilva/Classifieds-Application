namespace ClassificadosApi.DTOs;

public sealed record ClassificadoResponseDto(
    int Id,
    string Titulo,
    string Descricao,
    DateTime DataCadastro
);