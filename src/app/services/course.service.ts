import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../shared/courseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  GetByName(name: string) {
    return this.http.get<Course>("https://localhost:7176/course/ByName?name="+name);
  }
  Get() {
    return this.http.get<Array<Course>>("https://localhost:7176/course");
  }

  constructor(private http: HttpClient) { }

  Post(course: Course){
   return this.http.post("https://localhost:7176/course", course).subscribe();
  }
}
