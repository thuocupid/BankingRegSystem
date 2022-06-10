using Microsoft.EntityFrameworkCore;

namespace bankApi.Models
{
    public class BankAppContext : DbContext
    {
        public BankAppContext (DbContextOptions<BankAppContext> options) 
        : base(options) {


        }
        public DbSet<BankModel> BankModels {get;set;}
        public DbSet<Transactions> Transactions{get; set;}
        
    }
}