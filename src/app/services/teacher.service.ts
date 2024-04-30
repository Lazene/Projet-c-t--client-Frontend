import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../shared/DTO/UserDto';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'https://localhost:7176/api/Teacher';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}`);
  }
  getCoursesByTeacher(teacherId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${teacherId}/courses`);
  }
}
