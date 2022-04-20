import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }


  // public addUser(newUser: Credentials): Observable<Credentials> {
  //   return this.http.post<Credentials>(this.baseUrl + '/users', newUser);
  // }

  
  public registerUser(newUser: Credentials): Promise<Credentials> {
    return this.http.post<Credentials>(this.baseUrl + '/users', newUser).toPromise().catch(this.handleError);
  }

  private handleError(error: any):Promise<any> {
    return Promise.reject(error.message || error);
  }

}
