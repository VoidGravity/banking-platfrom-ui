import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = '/api/users';

  constructor(private http: HttpClient) {}




  create(user: User):Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/create`, user);
  }

  getAll():Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getById(id: number):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  update(id: number, user: User):Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }


  delete(id: number): Observable<void> {

    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  desactiveUser(id: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/desactive/${id}` ,{});
  }

}
