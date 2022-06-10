import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankClient } from '../models/bankClient';
import { BankClientService } from '../services/bank-client.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  bankClient$!: Observable<BankClient>;
  id!: number;

  constructor(private bankClientService: BankClientService, private avRoute: ActivatedRoute) { 
    const idParams= 'id';
    if(this.avRoute.snapshot.params[idParams]){
      this.id = this.avRoute.snapshot.params[idParams];
    }
  }

  ngOnInit() {
    this.loadBankClient()
  }

  loadBankClient(){
    this.bankClient$ = this.bankClientService.getBankClient(this.id)
  }

}
