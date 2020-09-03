import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainLoginService} from '../_services/main-login.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // variables
  validateForm!: FormGroup;
  errorDisplay: string;
  loadingState: boolean;

  // constructor
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {}

  // on init
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  // methods
  submitForm(): void {

    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm);
    if (this.validateForm.valid) {
      this.sendLoginRequest(
        this.validateForm.get('userName').value as string,
        this.validateForm.get('password').value as string
      );
    } else {
      this.errorDisplay = 'You haven\'t put the details in correctly.';
    }
  }

  sendLoginRequest(username, password): void {
    if (typeof username === 'string' && typeof password === 'string') {
      console.log('making request with ' + username + ' & ' + password);

      // Starting the Sign in process
      this.loadingState = true;
      this.authService.getAuthenticator(username, password)
        .subscribe(
          receivedAuthKeyData => {
            const userToken = JSON.stringify(receivedAuthKeyData.token);
            console.log('[Auth] Received userToken: ' + userToken);
            localStorage.setItem('userToken', userToken);
          },
          error => {
            console.log('[Auth] Error: ' + error); // temp
            this.errorDisplay = error as string;
            this.loadingState = false;
          },
          () => {
            console.log('[Auth] Completed.');
            this.router.navigate(['/dashboard']);
          }
        );
    }
  }

}
