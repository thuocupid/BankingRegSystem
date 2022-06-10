using bankApi.Data;
using bankApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace bankApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly BankAppContext? _context;
        private readonly IDataRepository<Transactions>? _repo;

    public TransactionController(BankAppContext context, IDataRepository<Transactions> repo){
        _context = context;
        _repo = repo;
    }

    [HttpGet]
    public IEnumerable<Transactions> GetTransactions(){
        return _context.Transactions.OrderByDescending(p => p.clientId);
    }

    [HttpPost]
    public async Task<ActionResult<Transactions>> PostTransaction([FromBody] Transactions transactions){
        if(!ModelState.IsValid){
            return BadRequest(ModelState);
        }

        _repo.Add(transactions);
        var save = await _repo.SaveAsync(transactions);

        return CreatedAtAction("Transaction Successful", new {id = transactions.clientId}, transactions);
    }

    }
}