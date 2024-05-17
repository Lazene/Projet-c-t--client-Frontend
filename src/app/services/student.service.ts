import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdUserDTO } from '../shared/DTO/UserDto';
import { Course } from '../shared/courseModel';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly API_URL = 'https://localhost:7176/api/Student'; 

  constructor(private http: HttpClient) { }

  // Obtient tous les étudiants
  getAllStudents(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  // Obtient un étudiant spécifique par son ID
  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  // Supprime un étudiant spécifique par son ID
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  // Obtient les cours associés à un étudiant spécifique
  getCoursesByStudent(studentId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${studentId}/courses`);
  }

  // Met à jour les informations d'un utilisateur
  updateUser(userDto: UpdUserDTO): Observable<any> {
    return this.http.put(`https://localhost:7176/api/User/${userDto.id}`, userDto);
  }

  // Obtient les soumissions de devoirs par étudiant
  getSubmissionsByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/submissions/${studentId}`);
  }
  
  // Obtient les devoirs attribués à un étudiant
  getAssignmentsByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${studentId}/assignments`);
  }
}
