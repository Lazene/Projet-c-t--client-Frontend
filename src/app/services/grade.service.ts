import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddGradeDTO } from '../shared/DTO/gradeDto';
import { UpdateGradeDTO } from '../shared/DTO/gradeDto';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'http://localhost:7176/api/grade'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getGradesByStudentId(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}`);
  }

  addGrade(grade: AddGradeDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, grade);
  }

  deleteGradeById(gradeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${gradeId}`);
  }

  updateGradeById(grade: UpdateGradeDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, grade);
  }
}