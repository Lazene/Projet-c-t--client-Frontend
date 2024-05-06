import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddGradeDTO, UpdateGradeDTO } from '../shared/DTO/gradeDto';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'https://localhost:7176/api/grade'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }
// recupere tous les notes d'un étudiant

// met à jour une note
  updateGradeById(grade: UpdateGradeDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, grade);
  }

}
