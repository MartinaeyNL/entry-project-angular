import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MainLoginService} from '../_services/main-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // variables
  validateForm!: FormGroup;

  // constructor
  constructor(private fb: FormBuilder, private loginService: MainLoginService) {}

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
      this.loginService.sendLoginRequest(this.validateForm.get('userName').value as string, this.validateForm.get('password').value as string);
    } else {
      console.log('incorrect data!');
    }
  }

}
