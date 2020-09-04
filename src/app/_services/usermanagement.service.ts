import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DbUser} from '../models/dbUser';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  // Constructor
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  // Methods
  public getUserHttpGet(offset: number, limit: number): Observable<any> {
    const httpSetup = this.http.get<Observable<any>>('/users?offset=' + offset + '&limit=' + limit);
    return httpSetup;
  }
  public getUserHttpPost(user: DbUser): Observable<any> {
    const httpSetup = this.http.post<Observable<any>>('/users', {user});
    return httpSetup;
  }
}
