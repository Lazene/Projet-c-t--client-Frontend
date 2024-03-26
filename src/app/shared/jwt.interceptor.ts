import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class jwtIntercept implements HttpInterceptor{

  constructor(private authentificationService : AuthentificationService) {}
  intercept (request : HttpRequest<any>, next : HttpHandler) : Observable<any> {
   const isAuthenticated = this.authentificationService.isAuthentificated();
   if(isAuthenticated){
    console.log("interceptor");
    const token = sessionStorage.getItem('jwt');
    request = request.clone({
      setHeaders: {Authorization: `Bearer`+ token }
      })
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !request.url.includes('login')) {
       //return this.handleRefreshToken(request, next);
        }
        return throwError(error);
      }));
  }
  return next.handle(request);
}
handleRefreshToken(request: any, next: HttpHandler): any {
  return this.authentificationService.refreshToken().pipe(
    switchMap((response: any) => {
      console.log("reponse:",response)
      sessionStorage.setItem('jwt', response.token);

      const cloneRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${response.token}`}
      });
      return next.handle(cloneRequest);
    }),
    catchError ((refreshError) => {
      return throwError(refreshError);
    }));
}
}