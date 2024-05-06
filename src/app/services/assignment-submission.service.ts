import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentSubmissionDTO } from '../shared/DTO/assignment-submssionDto';
import { GradeAssignmentDTO } from '../shared/DTO/GradeAssignmentDTO';
import { SubmissionDTO } from '../shared/DTO/SubmissionDTO';

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
 
  getSubmissionsByStudentAndCourse(studentId: number, courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/student/${studentId}/course/${courseId}`);
  }
  getSubmittedAssignmentsAllByCourse(courseId: number): Observable<SubmissionDTO[]> {
    return this.http.get<SubmissionDTO[]>(`${this.baseUrl}/All-submitted-by-course/${courseId}`);
  }
  getAssignementStatus(assignmentSubmissionId : number): Observable<any> {
    return this.http.get(`${this.baseUrl}/submission-status/${assignmentSubmissionId}`);
  }


  gradeAssignment(gradeDto: GradeAssignmentDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/grade`, gradeDto, { responseType: 'text' });
  }
  submitAssignmentBySubmissionId(submissionId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit/by-submission-id/${submissionId}`, {}, {
      responseType: 'text'  // Ajoutez ou ajustez cette option si la réponse est du texte
    });
  }
  
}
