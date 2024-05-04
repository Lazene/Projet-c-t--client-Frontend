import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UpdUserDTO, NewUserDTO } from '../shared/DTO/UserDto'

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
  createUser(newUser: NewUserDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, newUser, { responseType: 'text' });
  }

 // Mettre à jour un utilisateur
 updateUser(userDto: UpdUserDTO): Observable<any> {
  return this.http.put(`${this.baseUrl}/${userDto.id}`, userDto);
}

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // Récupérer les rôles d'un utilisateur
  getRoles(id:number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/role/${id}`);
  }
  
}
