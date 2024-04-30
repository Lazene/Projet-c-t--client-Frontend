import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentSubmissionDTO } from '../shared/DTO/assignment-submssionDto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {
  private baseUrl = 'http://localhost:7176/api/assignmentsubmission'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAssignmentsForStudent(studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${studentId}`);
  }

  submitAssignment(submission: AssignmentSubmissionDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, submission);
  }

  getSubmissions(assignmentId: number, studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignment/${assignmentId}/student/${studentId}`);
  }

  submitAssignmentForStudent(assignmentId: number, studentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/${assignmentId}/${studentId}`, {});
  }

  getSubmissionsByStudentAndCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}/course/${courseId}`);
  }

  getSubmissionsByAssignment(assignmentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignment/${assignmentId}`);
  }
  
}