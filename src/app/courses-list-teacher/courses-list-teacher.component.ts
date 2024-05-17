import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../shared/DTO/CourseDto';
import { CourseService } from '../services/course.service';
import { TeacherService } from '../services/teacher.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-courses-list-teacher',
  templateUrl: './courses-list-teacher.component.html',
  styleUrls: ['./courses-list-teacher.component.css']
})
export class CoursesListTeacherComponent implements OnInit {
  courses: Course[] = [];
  studentsByCourse: { [courseId: number]: any[] } = {}; // Stocke les étudiants par ID de cours
  isLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.loadTeacherCourses();
  }

  loadTeacherCourses(): void {
    const teacherId = this.authService.getUserId();
    if (teacherId) {
      this.teacherService.getCoursesByTeacher(teacherId).subscribe({
        next: (courses) => {
          this.courses = courses;
          this.loadStudentsForAllCourses(courses.map(course => course.courseId));
        },
        error: (error) => {
          console.error('Error fetching courses for teacher', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Teacher ID not found');
      this.isLoading = false;
    }
  }

  loadStudentsForAllCourses(courseIds: number[]): void {
    let observables = courseIds.map(courseId =>
      this.courseService.getStudentsByCourse(courseId).pipe(
        catchError(error => {
          console.error(`Failed to load students for course ${courseId}`, error);
          return of([]); 
        })
      )
    );

    forkJoin(observables).subscribe(results => {
      courseIds.forEach((courseId, index) => {
        this.studentsByCourse[courseId] = results[index];
      });
      this.isLoading = false;
    });
  }
}
