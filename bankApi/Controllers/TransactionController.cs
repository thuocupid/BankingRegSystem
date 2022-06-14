using bankApi.Data;
using bankApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bankApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly BankAppContext? _context;
        private readonly IDataRepository<Transactions>? _repo;

        public TransactionController(BankAppContext context, IDataRepository<Transactions> repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<Transactions> GetTransactions()
        {
            return _context.Transactions.OrderByDescending(p => p.clientId);
        }

        [HttpPost]
        public async Task<ActionResult<Transactions>> PostTransaction([FromBody] Transactions transactions, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // var transactionType = transactions.transactionType ? "deposit" : "withdraw";

            // try
            // {
            //     if (transactionType == "deposit")
            //     {
            //         //Logic
            //         var initialBalance = _context.Transactions.OrderByDescending(c => c.transactionDate).Select(c => c.AccBalance).FirstOrDefault();

            //         var newBalance = initialBalance + transactions.transactionAmount;


            //     }
            //     else if (transactionType == "withdraw")
            //     {
            //         var initialBalance = _context.Transactions.OrderByDescending(c => c.transactionDate).Select(c => c.AccBalance).FirstOrDefault();

            //         var newBalance = initialBalance - transactions.transactionAmount;
            //     }

            // }
            // catch (System.Exception)
            // {

            //     throw;
            // }


            _repo.Add(transactions);
            var save = await _repo.SaveAsync(transactions);

            return CreatedAtAction("Transaction Successful", transactions);
        }

        //Get all Transactions
        [HttpGet("{clientId}")]
        public async Task<ActionResult<Transactions>> GetTransaction([FromRoute] int id, [FromRoute] Transactions transactions)
        {
            var client = transactions.clientId;
            var transaction = await _context.Transactions.Where(x => x.clientId == client).ToListAsync();

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        //API to call the latest transaction ONLY
        [HttpGet("latest/{id}")]
        public async Task<ActionResult<Transactions>> GetLatestTransaction([FromRoute] int id)
        {
            var latestTransaction = await _context.Transactions.Where(x => x.clientId == id).OrderByDescending(c => c.transactionDate).Select(c => c.AccBalance).FirstOrDefaultAsync();

            return Ok(latestTransaction);
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction([FromRoute] int id, [FromRoute] Transactions transactions)
        {
            var client = transactions.clientId;
            if (id != client)
            {
                return NotFound();
            }
            _context.Entry(transactions).State = EntityState.Modified;
            try
            {
                _repo.Update(transactions);
                var save = await _repo.SaveAsync(transactions);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok("Transaction Successful");
        }

        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.clientId == id);
        }

    }
}