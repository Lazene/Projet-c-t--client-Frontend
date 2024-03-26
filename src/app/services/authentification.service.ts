import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private isAuthentificatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string>(sessionStorage.getItem("username") || '');
  private userRoleSubject = new BehaviorSubject<string>(sessionStorage.getItem("role") || '');

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {}
  
   // méthode pour logger un utilisateur
   login(userName: string, password: string): Observable<any> {
    // Assurez-vous que les clés correspondent à celles attendues par le DTO côté backend
    const loginData = { Username: userName, Password: password };
    return this.http.post(`https://localhost:7176/Authentification/Login`, loginData, {
   }).pipe(
        tap((response: any) => {
            sessionStorage.setItem("jwt", response.Token); // Assurez-vous que la clé correspond à celle renvoyée par le backend
            sessionStorage.setItem("username", userName); // Potentiellement adapter selon la réponse
            sessionStorage.setItem("role", "VotreLogiquePourDéfinirLeRôle"); // Adapter selon la réponse ou votre logique d'application
            this.isAuthentificatedSubject.next(true);
            this.usernameSubject.next(userName); // Adapter selon la réponse
            this.userRoleSubject.next("VotreLogiquePourDéfinirLeRôle"); // Adapter selon la réponse
        })
    );
}
  
  

   // méthode isAuthentificated pour vérifier si un utilisateur est authentifié
   isAuthentificated(): boolean{
    const token = sessionStorage.getItem("jwt");
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
get Name$(): Observable<string> {
  return this.usernameSubject.asObservable();
}
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
}