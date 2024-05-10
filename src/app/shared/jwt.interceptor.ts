import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class jwtIntercept implements HttpInterceptor{

  constructor(private authentificationService : AuthentificationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + jwtToken)
      });
      return next.handle(cloned);
    }

    return next.handle(request).pipe(
        catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handleRefreshToken(request, next);
            }
            return throwError(() => new Error('Unauthorized or token expired'));
        })
    );
}
  
handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
  return this.authentificationService.refreshToken().pipe(
    switchMap((response: any) => {
      const newToken = response.token;
      sessionStorage.setItem('jwt', newToken);
      // Cloner la requête avec le nouveau jeton
      const clonedRequest = request.clone({ 
        setHeaders: { Authorization: `Bearer ${newToken}` }
      });
      return next.handle(clonedRequest);
    }),
    catchError((error) => {
      console.error('Refresh token failed:', error);
      this.authentificationService.logout();  // Déconnecter l'utilisateur si le rafraîchissement échoue
      return throwError(() => new Error('Session expired, please log in again'));
    })
  );
}

  
  
}