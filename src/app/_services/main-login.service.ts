import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {catchError, first, timeout} from 'rxjs/operators';
import {User} from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MainLoginService {

  // Variables
  public userAuthenticatedObservable: Observable<boolean> = new Observable<boolean>(() => {
    console.log('this is observable 1');
  });

  // Constructor
  constructor(private authService: AuthenticationService) {
    // this.userDataObservable = this.userDataObservableSubject.asObservable();
  }




  /*-------------------*/
  /*      Methods      */
  /*-------------------*/

  /*sendLoginRequest(username, password): any {
    if (typeof username === 'string' && typeof password === 'string') {
      console.log('making request with ' + username + ' & ' + password);

      // Starting the Sign in process
      this.authService.getAuthenticator(username, password)
        .subscribe(
        receivedAuthKeyData => {
          const userToken = JSON.stringify(receivedAuthKeyData.token);
          console.log('[Auth] Received userToken: ' + userToken);
          localStorage.setItem('userToken', userToken);
        },
        error => {
          console.log('[Auth] Error: ' + error);
          return error;
        },
        () => {
          console.log('[Auth] Completed.');
          return;
        }
      );
    }
  }*/
}
