import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {

   }
   // méthode pour logger un utilisateur
   login (userName: string, password: string): Observable<any>{
     return this.http.post(`https://localhost:7176/Authentification/Login?password=${password}&login=${userName}`, null);
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
}

}
