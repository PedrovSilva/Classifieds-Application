using ClassificadosApi.Context;
using ClassificadosApi.DTOs;
using ClassificadosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ClassificadosApi.Services
{
    public class ClassificadoServices : IClassificadoServices
    {
        private readonly AppDbContext _context;

        public ClassificadoServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ClassificadoResponseDto> CreateClassificado(ClassificadoCreateDto dto)
        {
            var classificado = new Classificado
            {
                Titulo = dto.Titulo.Trim(),
                Descricao = dto.Descricao.Trim(),
                DataCadastro = DateTime.UtcNow
            };
            _context.Classificados.Add(classificado);
            
            await _context.SaveChangesAsync();

            return new ClassificadoResponseDto(
                classificado.Id,
                classificado.Titulo,
                classificado.Descricao,
                classificado.DataCadastro
            );
        }

        public async Task<ClassificadoResponseDto?> GetClassificado(int id)
        {
            return await  _context.Classificados
                .AsNoTracking()
                .Where(c => c.Id == id)
                .Select(c => new ClassificadoResponseDto(c.Id,c.Titulo,c.Descricao,c.DataCadastro))
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ClassificadoResponseDto>> GetClassificadosByData(int page, int pageSize)
        {
            return await _context.Classificados
                .AsNoTracking()
                .OrderByDescending(c => c.DataCadastro)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new ClassificadoResponseDto(c.Id, c.Titulo, c.Descricao, c.DataCadastro))
                .ToListAsync();
        }

        public async Task<ClassificadoResponseDto?> UpdateClassificado(int id, ClassificadoUpdateDto dto)
        {
            var classificado = await _context.Classificados
                .FirstOrDefaultAsync(c => c.Id == id);
            
            if (classificado is null)
                return null;
            
            classificado.Titulo = dto.Titulo.Trim();
            classificado.Descricao = dto.Descricao.Trim();

            await _context.SaveChangesAsync();

            return new ClassificadoResponseDto(
                classificado.Id,
                classificado.Titulo,
                classificado.Descricao,
                classificado.DataCadastro
            );
        }

        public async Task<bool> DeleteClassificado(int id)
        {
            var classificado = await _context.Classificados
                .FirstOrDefaultAsync(c => c.Id == id);
            
            if (classificado is null)
                return false;
            
            _context.Classificados.Remove(classificado);
            
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
