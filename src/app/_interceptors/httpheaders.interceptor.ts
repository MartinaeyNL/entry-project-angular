import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class HttpheadersInterceptor implements HttpInterceptor {

  // Variables
  userToken: string;

  constructor() {
    this.userToken = localStorage.getItem('userToken');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.userToken)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
