import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzFormModule,
  NzInputModule,
  NzPageHeaderModule, NzSpinModule
} from 'ng-zorro-antd';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpBaseUrlInterceptor} from './_interceptors/httpbaseurl.interceptor';
import {ErrorInterceptor} from './_interceptors/error.interceptor';
import { DashboardPageComponent } from './dashboard-homepage/dashboard-page.component';
import {HttpheadersInterceptor} from './_interceptors/httpheaders.interceptor';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {AuthguardInterceptor} from './_interceptors/authguard.interceptor';

registerLocaleData(en);

// Variables
const JWTModuleOptions: JwtModuleOptions = {
  config: {
    tokenGetter: () => localStorage.getItem('userToken')
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    AppRoutingModule,
    NzCheckboxModule,
    NzCardModule,
    NzAlertModule,
    NzSpinModule,
    JwtModule.forRoot(JWTModuleOptions)
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HttpBaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpheadersInterceptor, multi: true },
    AuthguardInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
