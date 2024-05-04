import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentSubmissionDTO } from '../shared/DTO/assignment-submssionDto';
import { GradeAssignmentDTO } from '../shared/DTO/GradeAssignmentDTO';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {
  private baseUrl = 'https://localhost:7176/api/AssignmentSubmission';

  constructor(private http: HttpClient) { }
// recupere les devoirs attribués à un étudiant
  getAssignmentsForStudent(studentId: number): Observable<any> {
    return this.http.get<AssignmentSubmissionDTO[]>(`${this.baseUrl}/${studentId}`);
  }
  submitAssignmentBySubmissionId(submissionId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/by-submission-id/${submissionId}`, {}, {
      responseType: 'text'  // Ajoutez ou ajustez cette option si la réponse est du texte
    });
  }
  
  submitAssignmentByAssignmentAndStudentId(assignmentId: number, studentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/by-assignment-student`, {
      assignmentId: assignmentId,
      studentId: studentId
    });
  }
  

// recupere les devoirs attribués à un étudiant
  getSubmissions(assignmentId: number, studentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignment/${assignmentId}/student/${studentId}`);
  }
// recupere les devoirs attribués à un étudiant
  submitAssignmentForStudent(assignmentId: number, studentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/${assignmentId}/${studentId}`, {});
  }
// recupere les devoirs attribués à un étudiant et un cours
  getSubmissionsByStudentAndCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}/course/${courseId}`);
  }

  getSubmissionsByAssignment(assignmentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignment/${assignmentId}`);
  }
// filtre les devoirs par status de soumission
  filterSubmissionsByStatus(isSubmitted: boolean): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/status?isSubmitted=${isSubmitted}`);
  }

  filterSubmissionsByDate(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/date?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  filterSubmissionsByGrade(gradeValue: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter/grade?gradeValue=${gradeValue}`);
  }
  gradeAssignment(gradeDto: GradeAssignmentDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/grade`, gradeDto);
  }
  getAssignementStatus(assignmentSubmissionId : number): Observable<any> {
    return this.http.get(`${this.baseUrl}/submission-status/${assignmentSubmissionId}`);
  }
}
