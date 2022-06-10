import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankClientsComponent } from './bank-clients/bank-clients.component';
import { BankClientComponent } from './bank-client/bank-client.component';
import { BankClientAddEditComponent } from './bank-client-add-edit/bank-client-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BankClientService } from './services/bank-client.service';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

@NgModule({
  declarations: [
    AppComponent,
    BankClientsComponent,
    BankClientComponent,
    BankClientAddEditComponent,
    DepositComponent,
    WithdrawComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    BankClientService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
