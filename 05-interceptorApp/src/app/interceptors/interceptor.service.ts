import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'token-usuario': 'ABC1651A6S5D16A5S1'
    });

    const reqClone = req.clone({
      headers: headers,
    })

    return next.handle(reqClone)
      .pipe(
        catchError( this.handleException )
      );
  }

  handleException(error: HttpErrorResponse) {
    console.log('Ocurrió un error...');
    console.log('Error registrado en el log file');
    console.warn(error);

    return throwError( () => new Error('Error personalizado') );
  }
}
