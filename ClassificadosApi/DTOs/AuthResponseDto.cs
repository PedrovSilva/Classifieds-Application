namespace ClassificadosApi.DTOs;

public sealed record AuthResponseDto(
    int Id,
    string Nome,
    string Email,
    string Token,
    DateTime ExpiresAt
);
