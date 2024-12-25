import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string; role: string; username: string }> {
    return this.http.post<{ token: string; role: string; username: string }>(`${this.baseUrl}/user/login`, { username, password });
  }

  register(data: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, data);
  }

  getLoggedInUser(token: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  logout(token: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
