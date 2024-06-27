import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ITransactions } from '../../../interfaces/transactions.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  http = inject(HttpClient);

  createTransaction(transaction:ITransactions): Observable<ITransactions>{
    return this.http.post<ITransactions>(environment.URL_API+"transactions",transaction)
  }

  getTransactions(): Observable<any>{
    return this.http.get<any>(environment.URL_API+"transactions")
  }

  getTransactionsCombo(): Observable<ITransactions[]> {
    return this.http.get<{ error: boolean, status: number, data: ITransactions[] }>(environment.URL_API + "transactions").pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      }),
      map(response => response.data)
    );
  }
  getTransactionById(id:string): Observable<any>{
    return this.http.get<any>(environment.URL_API+`transactions/${id}`)
  }

  updateTransaction(club:ITransactions): Observable<ITransactions>{
    return this.http.put<ITransactions>(environment.URL_API+`transactions`,club)
  }

  deleteTransaction(id:string): Observable<any>{
    return this.http.delete<any>(environment.URL_API+`transactions/${id}`)
  }
}
