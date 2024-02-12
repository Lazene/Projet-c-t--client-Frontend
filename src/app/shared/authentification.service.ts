import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient, public jwtHelper : JwtHelperService) {

   }
   login (userName: string, password: string): Observable<any>{
     return this.http.post(`https://localhost:7176/Authentification/Login?password=${password}&login=${userName}`, null);
   }
   isAuthentificated(): boolean{
    const token = sessionStorage.getItem("jwt");
    return !this.jwtHelper.isTokenExpired(token);
  }
  refreshToken(){
    const token = sessionStorage.getItem("jwt");
    return this.http.get(`https://localhost:7176/Authentication/RefreshToken?token=`+token);
  }

}
