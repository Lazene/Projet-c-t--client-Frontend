import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../shared/courseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  GetByName(name: string) {
    return this.http.get<Course>("http://localhost:5244/Course/ByName?name="+name);
  }
  Get() {
    return this.http.get<Array<Course>>("http://localhost:5244/Course");
  }

  constructor(private http: HttpClient) { }

  Post(course: Course) : any {
   return this.http.post("http://localhost:5244/course", course);
  }
}
