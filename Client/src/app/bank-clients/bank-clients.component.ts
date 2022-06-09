import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BankClient } from '../models/bankClient';
import { BankClientService } from '../services/bank-client.service';

@Component({
  selector: 'app-bank-clients',
  templateUrl: './bank-clients.component.html',
  styleUrls: ['./bank-clients.component.scss']
})
export class BankClientsComponent implements OnInit {
  bankClients$!: Observable<BankClient[]>;

  constructor(private bankClientService: BankClientService) { }

  ngOnInit() {
    this.loadBankClients();
  }

  loadBankClients(){
    this.bankClients$ = this.bankClientService.getBankClients()
      console.log('Response from the server',this.bankClients$)

  }

  delete(id: number) {
    const ans = confirm(`Do you wanty to delete Client with Id:` + id)
    if (ans) {
      this.bankClientService.deleteBankClient(id).subscribe((data)=> {
        this.loadBankClients();
      });
    }
  }

}
