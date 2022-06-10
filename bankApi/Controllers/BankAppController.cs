
using bankApi.Data;
using bankApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bankApi.Controllers
{

    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class BankAppController : ControllerBase
    {

        private readonly BankAppContext _context;
        private readonly IDataRepository<BankModel> _repo;

        public BankAppController(BankAppContext context, IDataRepository<BankModel> repo)
        {
            _context = context;
            _repo = repo;
        }
        [HttpGet]
        public IEnumerable<BankModel> GetBankClients()
        {
            return _context.BankModels.OrderByDescending(p => p.Id);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BankModel>> GetBankClient([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var bankClient = await _context.BankModels.FindAsync(id);

            if (bankClient == null)
            {
                return NotFound();
            }
            return Ok(bankClient);
        }

        [HttpPost]
        public async Task<ActionResult<BankModel>> BankClientPost([FromBody] BankModel bankModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(bankModel);
            var save = await _repo.SaveAsync(bankModel);

            return CreatedAtAction("Created Client", new { id = bankModel.Id }, bankModel);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankModel([FromRoute] int id, [FromBody] BankModel bankModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (id != bankModel.Id)
            {
                return BadRequest();

            }
            _context.Entry(bankModel).State = EntityState.Modified;

            try
            {
                _repo.Update(bankModel);
                var save = await _repo.SaveAsync(bankModel);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankModelExisits(id))
                {
                    return NotFound();

                }
                else
                {

                    throw;
                }

            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BankModel>> DeleteBankClient([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var bankClientToDelete = await _context.BankModels.FindAsync(id);
            if (bankClientToDelete == null)
            {
                return NotFound();
            }
            _repo.Delete(bankClientToDelete);
            var save = await _repo.SaveAsync(bankClientToDelete);


            return Ok(bankClientToDelete);
        }

        private bool BankModelExisits(int id)
        {
            return _context.BankModels.Any(e => e.Id == id);
        }
    }
}