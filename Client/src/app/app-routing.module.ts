import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankClientAddEditComponent } from './bank-client-add-edit/bank-client-add-edit.component';
import { BankClientComponent } from './bank-client/bank-client.component';
import { BankClientsComponent } from './bank-clients/bank-clients.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  {path: '', component: BankClientsComponent, pathMatch: 'full'},
  {path: 'bankclient/:id', component: BankClientComponent},
  {path:'add', component: BankClientAddEditComponent},
  {path:'bankclient/edit/:id', component: BankClientAddEditComponent},
  {path: 'bankclient/deposit/:id', component: DepositComponent},
  {path: 'bankclient/withdraw/:id', component: WithdrawComponent},
  {path: '**', redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
