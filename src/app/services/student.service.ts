import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';
import { UpdUserDTO } from '../shared/DTO/UserDto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly API_URL = 'https://localhost:7176/api/Student'; 
  constructor(private http: HttpClient, private courseService: CourseService) { }

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getCoursesByStudent(studentId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${studentId}/courses`);
  }
  updateUser(userDto: UpdUserDTO): Observable<any> {
    return this.http.put(`https://localhost:7176/api/User/${userDto.id}`, userDto);
  }
}