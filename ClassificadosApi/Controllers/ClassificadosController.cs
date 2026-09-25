using ClassificadosApi.DTOs;
using ClassificadosApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClassificadosApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClassificadosController : ControllerBase
{
    private readonly IClassificadoServices _classificadoService;

    public ClassificadosController(IClassificadoServices classificadoService)
    {
        _classificadoService = classificadoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClassificadoResponseDto>>> GetClassificados(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        if (page < 1)
            return BadRequest("Page must be greater than zero.");

        if (pageSize < 1 || pageSize > 100)
            return BadRequest("PageSize must be between 1 and 100.");

        var classificados =
            await _classificadoService.GetClassificadosByData(
                page,
                pageSize);

        return Ok(classificados);
    }

    [HttpGet("{id:int}", Name = "GetClassificado")]
    public async Task<ActionResult<ClassificadoResponseDto>> GetClassificado(int id)
    {
        var classificado =
            await _classificadoService.GetClassificado(id);

        if (classificado is null)
            return NotFound();

        return Ok(classificado);
    }

    [HttpPost]
    public async Task<ActionResult<ClassificadoResponseDto>> Create(
        ClassificadoCreateDto dto)
    {
        var classificado =
            await _classificadoService.CreateClassificado(dto);

        return CreatedAtRoute(
            nameof(GetClassificado),
            new { id = classificado.Id },
            classificado);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ClassificadoResponseDto>> Update(
        int id,
        ClassificadoUpdateDto dto)
    {
        var classificado =
            await _classificadoService.UpdateClassificado(id, dto);

        if (classificado is null)
            return NotFound();

        return Ok(classificado);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted =
            await _classificadoService.DeleteClassificado(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}