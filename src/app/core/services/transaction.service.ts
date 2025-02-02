import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/Transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = '/api/transactions';

  constructor(private http: HttpClient) {}

  getAll(page: number, pageSize: number): Observable<{ content: Transaction[]; totalElements: number }> {
    return this.http.get<{ content: Transaction[]; totalElements: number }>(
      `${this.baseUrl}?page=${page}&size=${pageSize}`
    );
  }

  updateStatus(transactionId: number, status: 'APPROVED' | 'REJECTED'): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${transactionId}/${status.toLowerCase()}`, {});
  }
}
