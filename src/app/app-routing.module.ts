import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-homepage/dashboard-page.component';
import {AuthguardInterceptor} from './_interceptors/authguard.interceptor';
import {AuthloginredirectInterceptor} from './_interceptors/authloginredirect.interceptor';
import {AuthenticationService} from './_services/authentication.service';

const routes = [

  // Pages
  { path: 'login', component: LoginPageComponent, canActivate: [AuthguardInterceptor], data: {requiresLogin: false} },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthguardInterceptor], data: {requiresLogin: true} },

  // Redirects
  { path: 'home', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthguardInterceptor], data: {requiresLogin: true} },

  // Final redirects (splits authorized and unauthorized users)
  { path: '**', redirectTo: '/login', canActivate: [AuthguardInterceptor], data: {requiresLogin: false} },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
