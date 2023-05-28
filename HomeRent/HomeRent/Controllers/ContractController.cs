using HomeRent.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeRent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : ControllerBase
    {
        private readonly BrandContext _dbContext;

        public ContractController(BrandContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]

        public async Task<ActionResult<IEnumerable<Contract>>> GetContractk()
        {
            if (_dbContext.Contract == null)
            {
                return NotFound();
            }
            return await _dbContext.Contract.ToListAsync();
        }

        [HttpGet("(id)")]

        public async Task<ActionResult<Contract>> GetContract(int id)
        {
            if (_dbContext.Contract == null)
            {
                return NotFound();
            }

            var contract = await _dbContext.Contract.FindAsync(id);
            if (contract == null)
            {
                return NotFound();
            }

            return contract;
        }



        [HttpPost]

        public async Task<ActionResult<Contract>> PostContract(Contract contract)
        {
            _dbContext.Contract.Add(contract);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContract), new { id = contract.ID }, contract);
        }


        [HttpPut]

        public async Task<ActionResult<Contract>> PutContract(int id, Contract contract)
        {

            if (id != contract.ID)
            {
                return BadRequest();
            }
            _dbContext.Entry(contract).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (ContractAvailable(id))
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

        private bool ContractAvailable(int id)
        {
            return (_dbContext.Contract?.Any(x => x.ID == id)).GetValueOrDefault();
        }



        [HttpDelete("(id)")]

        public async Task<IActionResult> DeleteContract(int id)
        {
            if (_dbContext.Contract == null)
            {
                return NotFound();
            }

            var contract = await _dbContext.Contract.FindAsync(id);

            if (contract == null)
            {
                return NotFound();
            }

            _dbContext.Contract.Remove(contract);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
