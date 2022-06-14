import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BankClient } from '../models/bankClient';
import { Transaction } from '../models/transaction';
import { BankClientService } from '../services/bank-client.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  bankClient$!: Observable<BankClient>;
  transaction$!: Observable<Transaction[]>;
  latestTransaction$!: Observable<Transaction>
  id!: number;
  accBalance!: number;
  transactionId!: number;
  transactionType!: true;
  existingAccount!: Transaction;
  form!: FormGroup;
  formInput!: string

  constructor(private bankClientService: BankClientService, private avRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    const idParams= 'id'
    this.formInput= 'amaount';
    if(this.avRoute.snapshot.params[idParams]){
      this.id = this.avRoute.snapshot.params[idParams]
    }
    this.form = this.formBuilder.group(
      {
        id: this.id,
        amount: ['', [Validators.required]]
      }
    )
    // var transactionId = ()=>{
    //   return '_'+ Math.random().toString(36).substring(2, 9)
    // }
  }


  ngOnInit() {
    this.loadBankClient()

  }

  loadBankClient(){
    this.transaction$ = this.bankClientService.getAccBalance(this.id)
    this.bankClient$ = this.bankClientService.getBankClient(this.id)
    this.latestTransaction$ = this.bankClientService.getLatestAccBalance(this.id)
  
  }

  save(){
    let transaction: Transaction={
      clientId: this.id,
      transactionId: this.transactionId,
      transactionAmount: this.form.get(this.formInput)?.value,
      transactionType: this.transactionType,
      accBalance: this.accBalance + this.form.get(this.formInput)?.value,
      transactionDate: new Date()
    }
    this.bankClientService.updateAccBalance(transaction.clientId, transaction)
    .subscribe((data)=>{
      this.router.navigate([this.router.url])
    })

    console.log('Object sent from the front end',transaction)
  }

  cancel(){
    this.router.navigate(['/'])
  }

}
