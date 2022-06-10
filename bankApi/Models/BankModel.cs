using System.ComponentModel.DataAnnotations;

namespace bankApi.Models
{
    public class BankModel
    {
        [Key]
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? Office {get;set;}

        public string? DateOfBirth {get;set;}

        public string? NextofKin {get;set;}

        public virtual Transactions? Transactions {get; set;}
    }
    
}