import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/DTO/UserDto';
import { LoginReponseDto } from '../shared/DTO/LoginReponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private baseUrl = 'https://localhost:7176/Authentification';
  private isAuthentificatedSubject = new BehaviorSubject<boolean>(false);
  private mustChangePasswordSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>(localStorage.getItem("username") || '');
  private userRoleSubject = new BehaviorSubject<string>(localStorage.getItem("role") || '');
  $user = new BehaviorSubject<User| undefined>(undefined);
  
  

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {}
  
   // méthode pour logger un utilisateur
   login(userName: string, password: string): Observable<LoginReponseDto> {
    return this.http.post<any>(`${this.baseUrl}/Login`, { userName, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem("jwt", response.token);
            localStorage.setItem("username", response.username);
            localStorage.setItem("role", response.role);
            localStorage.setItem('expires', response.expires);
            localStorage.setItem('mustChangePassword', response.mustChangePassword);
            localStorage.setItem('userId', response.userId); // Stockez l'ID de l'utilisateur
            this.usernameSubject.next(response.username);
            this.userRoleSubject.next(response.role);
            this.isAuthentificatedSubject.next(true);
            this.mustChangePasswordSubject.next(response.mustChangePassword);
            
          }
        })
      );
  }
   // méthode isAuthentificated pour vérifier si un utilisateur est authentifié
   isAuthentificated(): boolean {
    const token = localStorage.getItem("jwt");
    if (token) {
           const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return false;
  }
  
  mustUserChangePassword(): Observable<boolean> {
    return this.mustChangePasswordSubject.asObservable();
  }

refreshToken() {
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
  });
  return this.http.get<any>(`${this.baseUrl}/refresh-token`, { headers: headers })
  .pipe(
      tap(response => {
          localStorage.setItem("jwt", response.token);
      }),
      catchError(error => {
          console.error('Refresh token failed:', error);
          return throwError(() => new Error('Refresh token failed'));
      })
  );
}





  // méthode pour enregistrer un utilisateur
  register(userName: string, password: string): Observable<any>{
    const body = { userName, password }; // Créez un objet avec les données d'inscription
    return this.http.post(`${this.baseUrl}/Register`, body).pipe(
      tap(response => {
        if(response && response.token){
          localStorage.setItem("jwt", response.token);
          localStorage.setItem("username", response.userName);
          localStorage.setItem("role", response.role);
          this.usernameSubject.next(response.userName);
          this.userRoleSubject.next(response.role);
          this.isAuthentificatedSubject.next(true);
        }
      })
    );
  }
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/change-password`, { userId, oldPassword, newPassword }, { responseType: 'text' })
    .pipe(
        tap(() => {
            localStorage.setItem('mustChangePassword', 'false');
            this.mustChangePasswordSubject.next(false);
        }),
        catchError(error => {
            console.error('Change password failed:', error);
            return throwError(() => new Error('Change password failed'));
        })
    );
}
resetPassword(userId: number, newPassword: string): Observable<any> {
   return this.http.post(`${this.baseUrl}/ResetPassword`, { userId, newPassword }, { responseType: 'text' })
    .pipe(
      tap(() => alert('Password reset successful')),
      catchError(error => {
          console.error('Reset password failed:', error);
          return throwError(() => new Error(`Reset password failed: ${error.message}`));
      })
    );
}


  // méthode pour déconnecter un utilisateur
logout(): void {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  this.isAuthentificatedSubject.next(false);
  this.usernameSubject.next('');
  this.userRoleSubject.next('');
}
// méthode pour retourner l'état de l'authentification
get isAuthenticated$(): Observable<boolean> {
  return this.isAuthentificatedSubject.asObservable();
}
// méthode pour retourner le nom de l'utilisateur
get Name$(): Observable<string> {
  return this.usernameSubject.asObservable();
}
// méthode pour retourner le role de l'utilisateur
get userRole$(): Observable<string> {
  return this.userRoleSubject.asObservable();
}

// methode pour mettre à jour l'état de l'authentification
updateAuthenticationState(isAuthenticated: boolean): void {
  this.isAuthentificatedSubject.next(isAuthenticated);
}
// méthode pour obtenir le nom de l'utilisateur stocké dans le localStorage
getUserName(): string {
  return localStorage.getItem("username") || '';
}
// méthode pour obtenir le role de l'utilisateur stocké dans le localStorage
getUserRole(): string {
  return localStorage.getItem("role") || '';
}
// méthode pour obtenir l'ID de l'utilisateur stocké dans le localStorage
getToken(): string | null {
  return localStorage.getItem('jwt');
}

user(): Observable<User|undefined> {

  return this.$user.asObservable();
}
setUser(response: LoginReponseDto): void {

  if (!response || !response.userId) {
    console.error('Invalid login response:', response);
    return;
  }
  const user: User = {
    id: response.userId,
    username: response.username,
    role: response.role,
    
  };
  this.$user.next(user);
  localStorage.setItem("user-id", user.id.toString());
  localStorage.setItem('user-username', user.username);
  localStorage.setItem('user-roles', user.role);
}

// méthode pour obtenir l'ID de l'utilisateur stocké dans le localStorage
getUserId(): number {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error('No user ID found in localStorage');
    return null;
  }

  return +userId;
}


}