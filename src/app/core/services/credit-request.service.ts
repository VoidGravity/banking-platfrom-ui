import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditRequest } from '../models/CreditRequest.model';

@Injectable({
  providedIn: 'root',
})
export class CreditRequestService {
  private baseUrl = '/api/credit-requests';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CreditRequest[]> {
    return this.http.get<CreditRequest[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<CreditRequest> {
    return this.http.get<CreditRequest>(`${this.baseUrl}/${id}`);
  }

  create(request: Partial<CreditRequest>): Observable<CreditRequest> {
    return this.http.post<CreditRequest>(`${this.baseUrl}/request`, request);
  }

  approve(id: number, approve: boolean): Observable<CreditRequest> {
    return this.http.put<CreditRequest>(`${this.baseUrl}/approve/${id}?approve=${approve}`, {});
  }
}
