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
  private usernameSubject = new BehaviorSubject<string>(sessionStorage.getItem("username") || '');
  private userRoleSubject = new BehaviorSubject<string>(sessionStorage.getItem("role") || '');
  $user = new BehaviorSubject<User| undefined>(undefined);
  
  

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {}
  
   // méthode pour logger un utilisateur
   login(userName: string, password: string): Observable<LoginReponseDto> {
    return this.http.post<any>(`${this.baseUrl}/Login`, { userName, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            console.log('Login successful:', response);
            sessionStorage.setItem("jwt", response.token);
            sessionStorage.setItem("username", response.username);
            sessionStorage.setItem("role", response.role);
            sessionStorage.setItem('expires', response.expires);
            sessionStorage.setItem('mustChangePassword', response.mustChangePassword);
            sessionStorage.setItem('userId', response.userId); // Stockez l'ID de l'utilisateur
            this.usernameSubject.next(response.username);
            this.userRoleSubject.next(response.role);
            this.isAuthentificatedSubject.next(true);
            this.mustChangePasswordSubject.next(response.mustChangePassword);
            console.log("Storing token: ", response.token);
            
          }
        })
      );
  }
   // méthode isAuthentificated pour vérifier si un utilisateur est authentifié
   isAuthentificated(): boolean {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      // Vérifiez si le token est expiré
      const isExpired = this.jwtHelper.isTokenExpired(token);
      console.log("Token expired:", isExpired);
      return !isExpired;
    }
    return false;
  }
  
  mustUserChangePassword(): Observable<boolean> {
    return this.mustChangePasswordSubject.asObservable();
  }
  // méthode refreshToken pour rafraichir le token
// Assurez-vous que l'URL est correctement écrite et correspond à celle testée dans Swagger/cURL
refreshToken() {
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem("jwt")}`
  });
  return this.http.get<any>(`${this.baseUrl}/refresh-token`, { headers: headers })
  .pipe(
      tap(response => {
          sessionStorage.setItem("jwt", response.token);
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
          sessionStorage.setItem("jwt", response.token);
          sessionStorage.setItem("username", response.userName);
          sessionStorage.setItem("role", response.role);
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
            sessionStorage.setItem('mustChangePassword', 'false');
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
      tap(() => console.log('Password reset successful')),
      catchError(error => {
          console.error('Reset password failed:', error);
          return throwError(() => new Error(`Reset password failed: ${error.message}`));
      })
    );
}


  // méthode pour déconnecter un utilisateur
logout(): void {
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
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
// méthode pour obtenir le nom de l'utilisateur stocké dans le sessionStorage
getUserName(): string {
  return sessionStorage.getItem("username") || '';
}
// méthode pour obtenir le role de l'utilisateur stocké dans le sessionStorage
getUserRole(): string {
  return sessionStorage.getItem("role") || '';
}
// méthode pour obtenir l'ID de l'utilisateur stocké dans le sessionStorage
getToken(): string | null {
  return sessionStorage.getItem('jwt');
}

user(): Observable<User|undefined> {

  return this.$user.asObservable();
}
setUser(response: LoginReponseDto): void {
  // Vous pouvez créer un objet User ici si nécessaire, par exemple:
  if (!response || !response.userId) {
    console.error('Invalid login response:', response);
    return;
  }
  console.log('Setting user response:', response);
  const user: User = {
    id: response.userId,
    username: response.username,
    role: response.role,
    // Définissez les autres propriétés nécessaires, avec des valeurs par défaut ou des valeurs issues de response
  };
  this.$user.next(user);
  sessionStorage.setItem("user-id", user.id.toString());
  sessionStorage.setItem('user-username', user.username);
  sessionStorage.setItem('user-roles', user.role);
  console.log('User ID in sessionStorage:', sessionStorage.getItem("user-id"));
}

// méthode pour obtenir l'ID de l'utilisateur stocké dans le sessionStorage
getUserId(): number {
  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    console.error('No user ID found in sessionStorage');
    return null;
  }

  return +userId;
}


}