using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using teste_dev.api.Data;
using teste_dev.api.Models;
using teste_dev.api.DTOs;

namespace teste_dev.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CuidadoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cuidado>>> GetCuidados()
        {
            return await _context.Cuidados.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cuidado>> GetCuidado(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null)
                return NotFound();

            return cuidado;
        }

       // Cadastro de novo cuidado e associação com animal
        [HttpPost("animais/{animalId}/cuidados")]
        public async Task<ActionResult> CreateCuidadoParaAnimal(int animalId, [FromBody] CuidadoCadastroDTO dto)
        {
            var animal = await _context.Animais.FindAsync(animalId);
            if (animal == null)
                return NotFound("Animal não encontrado.");

            // Cria o novo cuidado
            var cuidado = new Cuidado
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Frequencia = dto.Frequencia
            };

            _context.Cuidados.Add(cuidado);
            await _context.SaveChangesAsync();

            // Cria associação AnimalCuidado com objetos required
            var animalCuidado = new AnimalCuidado
            {
                AnimalId = animalId,
                Animal = animal,
                CuidadoId = cuidado.Id,
                Cuidado = cuidado
            };

            _context.AnimaisCuidados.Add(animalCuidado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuidado), new { id = cuidado.Id }, cuidado);
        }
    
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCuidado(int id, Cuidado cuidado)
        {
            if (id != cuidado.Id)
                return BadRequest();

            _context.Entry(cuidado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cuidados.Any(e => e.Id == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuidado(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null)
                return NotFound();

            _context.Cuidados.Remove(cuidado);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
