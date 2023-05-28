using HomeRent.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlatController : ControllerBase
    {
        private readonly BrandContext _dbContext;

        public FlatController(BrandContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]

        public async Task<ActionResult<IEnumerable<Flat>>> GetFlat()
        {
            if (_dbContext.Flat == null)
            {
                return NotFound();
            }
            return await _dbContext.Flat.ToListAsync();
        }

        [HttpGet("(id)")]

        public async Task<ActionResult<Flat>> GetFlat(int id)
        {
            if (_dbContext.Flat == null)
            {
                return NotFound();
            }

            var flat = await _dbContext.Flat.FindAsync(id);
            if (flat == null)
            {
                return NotFound();
            }

            return flat;
        }



        [HttpPost]

        public async Task<ActionResult<Flat>> PostFlat(Flat flat)
        {
            _dbContext.Flat.Add(flat);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFlat), new { id = flat.ID }, flat);
        }


        [HttpPut]

        public async Task<ActionResult<Flat>> PutFlat(int id, Flat flat)
        {

            if (id != flat.ID)
            {
                return BadRequest();
            }
            _dbContext.Entry(flat).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (FlatAvailable(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();

        }

        private bool FlatAvailable(int id)
        {
            return (_dbContext.Flat?.Any(x => x.ID == id)).GetValueOrDefault();
        }



        [HttpDelete("(id)")]

        public async Task<IActionResult> DeleteFlat(int id)
        {
            if (_dbContext.Flat == null)
            {
                return NotFound();
            }

            var flat = await _dbContext.Flat.FindAsync(id);

            if (flat == null)
            {
                return NotFound();
            }

            _dbContext.Flat.Remove(flat);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
