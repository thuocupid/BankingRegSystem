import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankClient } from '../models/bankClient';

@Injectable({
  providedIn: 'root'
})
export class BankClientService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions ={
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = "/bankapp"
   }

   getBankClients(): Observable<BankClient[]>{
     return this.http.get<BankClient[]>(this.myAppUrl + this.myApiUrl)
     .pipe(
       retry(1),
       catchError(this.errorHandler)
     );
     
     
   }

   getBankClient(Id: number): Observable<BankClient>{
     return this.http.get<BankClient>(this.myAppUrl + this.myApiUrl + '/'+Id)
     .pipe(
       
       retry(1),
       catchError(this.errorHandler)
     );
   }

   saveBankClient(bankClient: any): Observable<BankClient>{
     return this.http.post<BankClient>(this.myAppUrl + this.myApiUrl, JSON.stringify(bankClient), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.errorHandler)
     );
   }

   updateBankClient(Id: number): Observable<BankClient>{
     return this.http.delete<BankClient>(this.myAppUrl + this.myApiUrl +'/'+ Id)
     .pipe(
       retry(1),
       catchError(this.errorHandler)
     );
   }

   deleteBankClient(Id: number): Observable<BankClient>{
     return this.http.delete<BankClient>(this.myAppUrl + this.myApiUrl + '/'+Id)
     .pipe(
       retry(1), 
       catchError(this.errorHandler)
     )
   }

   errorHandler(error: { error: { message: string; }; status: any; message: any; }){
     let errorMessage = '';
     if (error.error instanceof ErrorEvent){
       //get client-side errors
       errorMessage = error.error.message
     } else {
       //ger server-side errors
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage)
     return throwError(errorMessage)
   }
}

