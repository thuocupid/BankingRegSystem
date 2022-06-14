namespace bankApi.Models.DTO
{
    public class NewTransaction
    {
        public int clientId {get; set;}
        public int AccBalance{get; set;}
        public int transactionAmount{get; set;}
        public bool transactionType{get; set;}
        public DateTime transactionDate{get;set;}
    }
}