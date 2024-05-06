import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GradeAssignmentDTO } from '../shared/DTO/GradeAssignmentDTO';
import { DetailedSubmissionDTO } from '../shared/DTO/DetailedSubmissionDTO';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {
  private baseUrl = 'https://localhost:7176/api/AssignmentSubmission';

  constructor(private http: HttpClient) { }
// recupere les devoirs attribués à un étudiant
getAssignmentsForStudent(studentId: number): Observable<DetailedSubmissionDTO[]> {
  return this.http.get<DetailedSubmissionDTO[]>(`${this.baseUrl}/${studentId}`);
}
getSubmissionsByStudentAndCourse(studentId: number, courseId: number): Observable<DetailedSubmissionDTO[]> {
  return this.http.get<DetailedSubmissionDTO[]>(`${this.baseUrl}/student/${studentId}/course/${courseId}`);
}
getSubmittedAssignmentsAllByCourse(courseId: number): Observable<DetailedSubmissionDTO[]> {
  return this.http.get<DetailedSubmissionDTO[]>(`${this.baseUrl}/All-submitted-by-course/${courseId}`);
}
getAssignmentStatus(assignmentSubmissionId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}/submission-status/${assignmentSubmissionId}`);
}
gradeAssignment(gradeDto: GradeAssignmentDTO): Observable<string> {
  return this.http.post(`${this.baseUrl}/grade`, gradeDto, { responseType: 'text' });
}
submitAssignmentBySubmissionId(submissionId: number): Observable<string> {
  return this.http.post(`${this.baseUrl}/submit/by-submission-id/${submissionId}`, {}, { responseType: 'text' });
}
getOverallAverageGrade(studentId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/overall-average/${studentId}`);
}
getCourseAverageGrade(studentId: number, courseId: number): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/course-average/${studentId}/${courseId}`);
}

}

