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

  ngOnInit(): void {
    this.loadBankClients();
    console.log(this.bankClients$)
  }

  loadBankClients(){
    this.bankClients$ = this.bankClientService.getBankClients()
  }

  delete(Id: number) {
    const ans = confirm(`Do you wanty to delete Client with Id:` +Id)
    if (ans) {
      this.bankClientService.deleteBankClient(Id).subscribe((data)=> {
        this.loadBankClients();
      })
    }
  }

}
