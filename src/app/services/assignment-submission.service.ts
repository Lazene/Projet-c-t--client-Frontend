import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentSubmissionDTO } from '../shared/DTO/assignment-submssionDto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {
  private baseUrl = 'https://localhost:7176/api/AssignmentSubmission';

  constructor(private http: HttpClient) { }

  getAssignmentsForStudent(studentId: number): Observable<any> {
    return this.http.get<AssignmentSubmissionDTO[]>(`${this.baseUrl}/${studentId}`);
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

  // Nouvelles méthodes correspondant aux nouveaux endpoints
  filterSubmissionsByStatus(isSubmitted: boolean): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/status?isSubmitted=${isSubmitted}`);
  }

  filterSubmissionsByDate(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/date?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  filterSubmissionsByGrade(gradeValue: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/grade?gradeValue=${gradeValue}`);
  }
}
