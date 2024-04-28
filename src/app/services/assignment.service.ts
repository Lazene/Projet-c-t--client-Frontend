import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddAssignmentDTO, UpdateAssignmentDTO } from '../shared/DTO/assignmentDto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = 'http://localhost:7176/api/assignment'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllAssignments(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAssignmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAssignmentsByCourseId(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/${courseId}`);
  }

  addAssignment(assignment: AddAssignmentDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}`, assignment);
  }

  updateAssignment(id: number, assignment: UpdateAssignmentDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, assignment);
  }

  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getSubmissionsByStudentAndCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}/course/${courseId}`);
  }
}