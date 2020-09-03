import { Injectable } from '@angular/core';
import {observable, Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Variables
  authenticator: Observable<boolean>;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
  }

  // Methods
  public getAuthenticator(email: string, password: string): Observable<any> {
    const httpSetup = this.http.post<Observable<any>>('/auth/login', {email, password});
    return httpSetup;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
