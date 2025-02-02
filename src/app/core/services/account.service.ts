import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = '/api/accounts';

  constructor(private http: HttpClient) {}



  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/all`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/create`, account);
  }

  getAccountById(accountId: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${accountId}`);
  }

  updateAccountStatus(accountId: number, status: string): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/${accountId}/status`, status);
  }

  deleteAccount(accountId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${accountId}`);
  }
}
