import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddAssignmentDTO, AssignmentDTO, UpdateAssignmentDTO } from '../shared/DTO/assignmentDto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = 'https://localhost:7176/api/assignment'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllAssignments(): Observable<AssignmentDTO[]> {
    return this.http.get<AssignmentDTO[]>(`${this.baseUrl}`);
  }

  getAssignmentById(id: number): Observable<AssignmentDTO> {
    return this.http.get<AssignmentDTO>(`${this.baseUrl}/${id}`);
  }

  getAssignmentsByCourseId(courseId: number): Observable<AssignmentDTO[]> {
    return this.http.get<AssignmentDTO[]>(`${this.baseUrl}/course/${courseId}`);
  }

  addAssignment(assignment: AddAssignmentDTO): Observable<AssignmentDTO> {
    return this.http.post<AssignmentDTO>(`${this.baseUrl}`, assignment);
  }

  updateAssignment(id: number, assignment: UpdateAssignmentDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, assignment);
  }

  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
