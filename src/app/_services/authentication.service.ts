import { Injectable } from '@angular/core';
import {observable, Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Variables
  authenticator: Observable<boolean>;

  constructor(private http: HttpClient) {
  }

  // Methods
  public getAuthenticator(email: string, password: string): Observable<any> {
    const httpData = this.http.post<Observable<any>>('/auth/login', {email, password});
    return httpData;
  }
}
