import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class jwtIntercept implements HttpInterceptor{

  constructor(private authentificationService : AuthentificationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('jwt');
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
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
      switchMap((token: any) => {
        // Stocker le nouveau token et rejouer la requête originale
        sessionStorage.setItem('jwt', token);
        const clonedRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        return next.handle(clonedRequest);
      }),
      catchError((error) => {
        // Gestion de l'échec du rafraîchissement du token
        console.error('Refresh token failed:', error);
        return throwError(() => new Error('Session expired, please log in again'));
      })
    );
  }
  
  
}