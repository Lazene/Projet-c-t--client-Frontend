import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddGradeDTO, UpdateGradeDTO } from '../shared/DTO/gradeDto';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'http://localhost:7176/api/grade'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }
// recupere tous les notes d'un étudiant
  getGradesByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}`);
  }
// ajoute une note
  addGrade(grade: AddGradeDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, grade);
  }
// supprime une note
  deleteGradeById(gradeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${gradeId}`);
  }
// met à jour une note
  updateGradeById(grade: UpdateGradeDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, grade);
  }
// recupere la moyenne des notes d'un étudiant
  getAverageGradeByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/average/student/${studentId}`);
  }
  // recupere la moyenne des notes d'un étudiant pour un cours
  getAverageGradeByStudentAndCourseId(studentId: number, courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/average/student/${studentId}/course/${courseId}`);
  }
}
