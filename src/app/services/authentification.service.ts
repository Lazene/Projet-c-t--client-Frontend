import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/DTO/UserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private isAuthentificatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>(sessionStorage.getItem("username") || '');
  private userRoleSubject = new BehaviorSubject<string>(sessionStorage.getItem("role") || '');
  $user = new BehaviorSubject<User| undefined>(undefined);
  
  

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {}
  
   // méthode pour logger un utilisateur
   login(userName: string, password: string): Observable<any> {
    const loginData = { Username: userName, Password: password };
    return this.http.post<any>(`https://localhost:7176/Authentification/Login`, loginData)
      .pipe(
        tap(response => {
          if (response && response.token) {
            sessionStorage.setItem("jwt", response.token);
            sessionStorage.setItem("username", response.username);
            sessionStorage.setItem("role", response.role);
            sessionStorage.setItem('expires', response.expires);
            sessionStorage.setItem('userId', response.userId); // Stockez l'ID de l'utilisateur
            this.usernameSubject.next(response.username);
            this.userRoleSubject.next(response.role);
            this.isAuthentificatedSubject.next(true);
            console.log("Storing token: ", response.token);
          }
        })
      );
  }
  
  
  

   // méthode isAuthentificated pour vérifier si un utilisateur est authentifié
   isAuthentificated(): boolean{
    const token = sessionStorage.getItem("jwt");
    console.log("Retrieved token: ", token);
    return !this.jwtHelper.isTokenExpired(token);

  }
  // méthode refreshToken pour rafraichir le token
  refreshToken(){ 
    const token = sessionStorage.getItem("jwt");
    return this.http.get<any>(`https://localhost:7176/Authentication/RefreshToken?token=`+token).pipe(
      tap(response => {
        if(response && response.token){
          sessionStorage.setItem("jwt", response.token);
        }
      })
    );
  }
  // méthode pour enregistrer un utilisateur
  register(userName: string, password: string): Observable<any>{
    const body = { userName, password }; // Créez un objet avec les données d'inscription
    return this.http.post(`https://localhost:7176/Authentification/Register`, body).pipe(
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
setUser(user: User): void {
  if (!user || !user.id) {
    console.error('Invalid user:', user);
    return;
  }
  console.log('Setting user:', user);
  this.$user.next(user);
  localStorage.setItem("user-id", user.id.toString());
  localStorage.setItem('user-username', user.username);
  localStorage.setItem('user-roles', user.role);
  console.log('User ID in localStorage:', localStorage.getItem("user-id"));
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