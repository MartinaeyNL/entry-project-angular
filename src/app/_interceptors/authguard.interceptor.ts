import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router} from '@angular/router';

@Injectable()
export class AuthguardInterceptor implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      return this.authService.isAuthenticated();
    } else {
      return !this.authService.isAuthenticated();
    }
  }
}
