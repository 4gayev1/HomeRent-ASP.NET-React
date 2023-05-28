using HomeRent.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlokController : ControllerBase
    {
        private readonly BrandContext _dbContext;

        public BlokController(BrandContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]

        public async Task<ActionResult<IEnumerable<Blok>>> GetBlok()
        {
            if (_dbContext.Blok == null)
            {
                return NotFound();
            }
            return await _dbContext.Blok.ToListAsync();
        }

        [HttpGet("(id)")]

        public async Task<ActionResult<Blok>> GetBlok(int id)
        {
            if (_dbContext.Blok == null)
            {
                return NotFound();
            }

            var blok = await _dbContext.Blok.FindAsync(id);
            if (blok == null) {
                return NotFound(); 
            }

            return blok;
        }



        [HttpPost]

        public async Task<ActionResult<Blok>> PostBlok(Blok blok)
        {
            _dbContext.Blok.Add(blok);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBlok), new { id = blok.ID }, blok);
        }


        [HttpPut]

        public async Task<ActionResult<Blok>> PutBlok(int id, Blok blok)
        {

            if (id != blok.ID)
            {
                return BadRequest();
            }
            _dbContext.Entry(blok).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (BlokAvailable(id))
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

        private bool BlokAvailable(int id)
        {
            return (_dbContext.Blok?.Any(x => x.ID == id)).GetValueOrDefault();
        }



        [HttpDelete("(id)")]

        public async Task<IActionResult> DeleteBLok(int id)
        {
            if (_dbContext.Blok == null)
            {
                return NotFound();
            }

            var blok = await _dbContext.Blok.FindAsync(id);

            if (blok == null)
            {
                return NotFound();
            }

            _dbContext.Blok.Remove(blok);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }



    }
}
