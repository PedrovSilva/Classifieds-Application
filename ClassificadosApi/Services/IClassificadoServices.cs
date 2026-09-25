using ClassificadosApi.DTOs;
using ClassificadosApi.Models;

namespace ClassificadosApi.Services
{
    public interface IClassificadoServices
    {
        Task<ClassificadoResponseDto?> GetClassificado(int Id);
        Task <IEnumerable<ClassificadoResponseDto>> GetClassificadosByData(int page, int pageSize);
        Task<ClassificadoResponseDto> CreateClassificado(ClassificadoCreateDto dto);
        
        Task<ClassificadoResponseDto?> UpdateClassificado(int id,ClassificadoUpdateDto dto);
        
        Task<bool> DeleteClassificado(int id);
    }
}
