import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        console.log(error);

        // Cannot connect to server
        if (error.status === 0) {
          console.log('Couldn\'t connect to server.');
          return throwError('Couldn\'t connect to server.')
        }

        // Unauthorized
        if (error.status === 401) {
          console.log('Invalid Credentials.'); // temp
          if (this.router.url === '/dashboard') {
            localStorage.removeItem('userToken');
            this.router.navigate(['/login']);
          }
          return throwError('Invalid Credentials.');
        }
        // else if(error.type)
        return throwError(error);
      })
    );
  }
}
