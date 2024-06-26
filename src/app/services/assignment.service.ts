import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentDTO } from '../shared/DTO/AssignmentDTO';
import { UpdateAssignmentDTO } from '../shared/DTO/UpdateSubmissionDTO';
import { AddAssignmentDTO } from '../shared/DTO/AddAssignmentDTO';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private baseUrl = 'https://localhost:7176/api/assignment'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }
// recupere tous les devoirs
  getAllAssignments(): Observable<AssignmentDTO[]> {
    return this.http.get<AssignmentDTO[]>(`${this.baseUrl}`);
  }
// recupere les devoirs attribués à un cours
  getAssignmentsByCourseId(courseId: number): Observable<AssignmentDTO[]> {
    return this.http.get<AssignmentDTO[]>(`${this.baseUrl}/course/${courseId}`);
  }
// ajoute un devoir
  addAssignment(assignment: AddAssignmentDTO): Observable<AssignmentDTO> {
    return this.http.post<AssignmentDTO>(`${this.baseUrl}`, assignment);
  }
// met à jour un devoir
  updateAssignment(id: number, assignment: UpdateAssignmentDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, assignment);
  }
// supprime un devoir
  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
