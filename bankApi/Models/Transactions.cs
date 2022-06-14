
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bankApi.Models
{
    public class Transactions
    {
        [Key]
        public int transactionId {get; set;}
        [ForeignKey("BankModel")]
        public int clientId {get; set;}
        public int AccBalance{get; set;}
        public int transactionAmount{get; set;}
        public bool transactionType{get; set;}
        public DateTime transactionDate{get;set;}
        
        public virtual BankModel? BankModel {get; set;}
    }
}