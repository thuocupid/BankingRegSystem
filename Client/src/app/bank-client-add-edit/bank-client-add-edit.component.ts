import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankClient } from '../models/bankClient';
import { BankClientService } from '../services/bank-client.service';

@Component({
  selector: 'app-bank-client-add-edit',
  templateUrl: './bank-client-add-edit.component.html',
  styleUrls: ['./bank-client-add-edit.component.scss']
})
export class BankClientAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formOfficeInput: string;
  formDObInput: string;
  formNoKInput: string;
  id!: number;
  errorMessage: any;
  existingBankClient!: BankClient;

  constructor(private bankClientService: BankClientService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParams = 'id';
    this.actionType = 'Add';
    this.formTitle ='title';
    this.formOfficeInput = 'body';
    this.formDObInput = 'dob';
    this.formNoKInput = 'nok';
    if(this.avRoute.snapshot.params[idParams]){
      this.id = this.avRoute.snapshot.params[idParams];
    }
    
    this.form = this.formBuilder.group(
      {
        id: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        nok: ['', [Validators.required]],
      }
    )
   }

  ngOnInit() {
    if (this.id > 0){
      this.actionType = 'Edit';
      this.bankClientService.getBankClient(this.id)
      .subscribe(data => (
        this.existingBankClient = data,
        this.form.controls[this.formTitle].setValue(data.name),
        this.form.controls[this.formOfficeInput].setValue(data.office),
        this.form.controls[this.formDObInput].setValue(data.dateOfBirth),
        this.form.controls[this.formNoKInput].setValue(data.nextofKin)
      ));
    }
  }
  save(){
    if(!this.form.valid){
      return;
    }
    if(this.actionType ==='Add'){
      let bankClient: BankClient ={
        dateOfBirth: this.form.get(this.formDObInput)?.value,
        name: this.form.get(this.formTitle)?.value,
        office: this.form.get(this.formOfficeInput)?.value,
        nextofKin: this.form.get(this.formNoKInput)?.value,
        id: 0
      };
      this.bankClientService.saveBankClient(bankClient)
      .subscribe((data)=>{
        this.router.navigate([this.router.url])
      });
    }

    if(this.actionType==='Edit'){
      let bankClient: BankClient ={
        id: this.existingBankClient.id,
        name: this.form.get(this.formTitle)?.value,
        office: this.form.get(this.formOfficeInput)?.value,
        dateOfBirth: this.form.get(this.formDObInput)?.value,
        nextofKin: this.form.get(this.formNoKInput)?.value,
      }
      this.bankClientService.updateBankClient(bankClient.id, bankClient)
      .subscribe((data)=>{
        this.router.navigate([this.router.url]);
      });
    }
  }

  cancel(){
    this.router.navigate(['/'])
  }
  get title(){return this.form.get(this.formTitle);}
  get office(){return this.form.get(this.formOfficeInput);}
  get dateOfBirth(){return this.form.get(this.formDObInput);}
  get nextOfKin(){return this.form.get(this.formNoKInput);}
}
