import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {timeout} from 'rxjs/operators';
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

  // public userDataObservable: Observable<User>;
  // private userDataObservableSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  // Constructor
  constructor(private authService: AuthenticationService) {
    // this.userDataObservable = this.userDataObservableSubject.asObservable();
  }




  /*-------------------*/
  /*      Methods      */
  /*-------------------*/

  sendLoginRequest(username, password): void {
    if (typeof username === 'string' && typeof password === 'string') {
      console.log('making request with ' + username + ' & ' + password);

      // Starting the Sign in process
      this.authService.getAuthenticator(username, password).subscribe(
        receivedAuthKeyData => {
          const userToken = JSON.stringify(receivedAuthKeyData.token);
          localStorage.setItem('userToken', userToken);
        },
        error => {
          console.log(error);
        },
        () => {
          console.log('[Auth] Completed.');
        }
      );
    }
  }
}
