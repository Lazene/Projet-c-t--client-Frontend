import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private isAuthentificatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {

   }
   // méthode pour logger un utilisateur
   login (userName: string, password: string): Observable<any>{
    if (this.isAuthentificated){this.isAuthentificatedSubject.next(true);} 
    return this.http.post(`http://localhost:5244/Authentification/Login?password=${password}&login=${userName}`, null);

   }
   // méthode isAuthentificated pour vérifier si un utilisateur est authentifié
   isAuthentificated(): boolean{
    const token = sessionStorage.getItem("jwt");
    return !this.jwtHelper.isTokenExpired(token);
  }
  // méthode refreshToken pour rafraichir le token
  refreshToken(){
    const token = sessionStorage.getItem("jwt");
    return this.http.get(`https://localhost:7176/Authentication/RefreshToken?token=`+token);
  }
  // méthode pour enregistrer un utilisateur
  register(userName: string, password: string): Observable<any>{
    
    return this.http.post(`https://localhost:7176/Authentification/Register?password=${password}&login=${userName}`, null);
  }
logout(){
  sessionStorage.removeItem("jwt");
  this.isAuthentificatedSubject.next(false);
}
// méthode pour retourner l'état de l'authentification
get isAuthenticated$(): Observable<boolean> {
  return this.isAuthentificatedSubject.asObservable();
}
// methode pour mettre à jour l'état de l'authentification
updateAuthenticationState(isAuthenticated: boolean): void {
  this.isAuthentificatedSubject.next(isAuthenticated);
}
}
