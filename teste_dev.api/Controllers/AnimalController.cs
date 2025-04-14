using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using teste_dev.api.Data;
using teste_dev.api.Models;

namespace teste_dev.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnimalController(AppDbContext context)
        {
            _context = context;
        }

        // Obtém todos os animais com os cuidados relacionados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAnimais()
        {
            var animais = await _context.Animais
                .Include(a => a.AnimaisCuidados) // Inclui a relação AnimaisCuidados
                .ThenInclude(ac => ac.Cuidado) // Inclui os cuidados associados
                .ToListAsync();

            return animais;
        }

        // Obtém um animal específico, com seus cuidados relacionados
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimal(int id)
        {
            var animal = await _context.Animais
                .Include(a => a.AnimaisCuidados) // Inclui a relação AnimaisCuidados
                .ThenInclude(ac => ac.Cuidado) // Inclui os cuidados associados
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
            {
                return NotFound();
            }

            return animal;
        }

        // Cria um novo animal
        [HttpPost]
        public async Task<ActionResult<Animal>> CreateAnimal(Animal animal)
        {
            _context.Animais.Add(animal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAnimal), new { id = animal.Id }, animal);
        }

        // Atualiza um animal existente
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnimal(int id, Animal animal)
        {
            if (id != animal.Id)
            {
                return BadRequest();
            }

            _context.Entry(animal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Animais.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // Exclui um animal
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            var animal = await _context.Animais.FindAsync(id);
            if (animal == null)
            {
                return NotFound();
            }

            _context.Animais.Remove(animal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Relaciona um cuidado a um animal
    [HttpPost("{animalId}/cuidados/{cuidadoId}")]
    public async Task<IActionResult> AddCuidadoToAnimal(int animalId, int cuidadoId)
    {
        var animal = await _context.Animais.FindAsync(animalId);
        var cuidado = await _context.Cuidados.FindAsync(cuidadoId);

        if (animal == null || cuidado == null)
        {
            return NotFound();
        }

        // Instanciação correta de AnimalCuidado, garantindo que Animal e Cuidado sejam inicializados
        var animalCuidado = new AnimalCuidado
        {
            AnimalId = animalId,
            CuidadoId = cuidadoId,
            Animal = animal,  // Inicializando o membro Animal
            Cuidado = cuidado // Inicializando o membro Cuidado
        };

        _context.AnimaisCuidados.Add(animalCuidado);
        await _context.SaveChangesAsync();

        return Ok();
}


        // Remove um cuidado de um animal
        [HttpDelete("{animalId}/cuidados/{cuidadoId}")]
        public async Task<IActionResult> RemoveCuidadoFromAnimal(int animalId, int cuidadoId)
        {
            var animalCuidado = await _context.AnimaisCuidados
                .FirstOrDefaultAsync(ac => ac.AnimalId == animalId && ac.CuidadoId == cuidadoId);

            if (animalCuidado == null)
            {
                return NotFound();
            }

            _context.AnimaisCuidados.Remove(animalCuidado);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
