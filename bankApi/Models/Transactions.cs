using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bankApi.Models
{
    public class Transactions
    {
        [Key]
        [ForeignKey("BankModel")]
        public int clientId {get; set;}
        public int AccBalance{get; set;}
        
        public virtual BankModel? BankModel {get; set;}
    }
}