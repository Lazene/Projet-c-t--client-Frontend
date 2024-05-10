import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UpdUserDTO, NewUserDTO, AddUserDTO } from '../shared/DTO/UserDto'
import { LoginStatisticsDto } from '../shared/DTO/LoginStatisticsDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7176/api/User'; 

  constructor(private http: HttpClient) { }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    console.log(User)
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouvel utilisateur
  createUser(newUser: NewUserDTO): Observable<AddUserDTO> {
    return this.http.post<AddUserDTO>(`https://localhost:7176/Authentification/Register`, newUser);
  }

 // Mettre à jour un utilisateur
 updateUser(userDto: UpdUserDTO): Observable<UpdUserDTO> {
  return this.http.put<UpdUserDTO>(`${this.baseUrl}/${userDto.id}`, userDto);
}

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // Récupérer les rôles d'un utilisateur
  getRoles(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/role/${id}`,{ responseType: 'text' });
  }
  getLoginStatistics(): Observable<LoginStatisticsDto> {
    return this.http.get<LoginStatisticsDto>(`${this.baseUrl}/login-statistics`);
  }
}
