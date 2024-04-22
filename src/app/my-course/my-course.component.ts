import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/DTO/CourseDto';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, finalize, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  availableCourses: Course[] = [] ;
  courses$?: Observable<Course[]>;
  myCourses: Course[] = [];
  myCourses$?: Observable<Course[]>;
  isLoading: boolean = false;
  enrollmentStatus: { [courseId: string]: boolean } = {};

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private authService: AuthentificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('Is authenticated: ', this.authService.isAuthentificated());
   // this.isLoading = true;
    this.courses$=this.courseService.getAllCourses();
    console.log('Courses:', this.courses$);
    this.myCourses$=this.studentService.getCoursesByStudent(this.authService.getUserId());
    console.log('My courses:', this.myCourses$);
    console.log(this.authService.getUserId());
  }


  isEnrolled(courseId: number): Observable<boolean> {
    return this.myCourses$.pipe(
      map(courses => courses.some(c => c.courseId === courseId))
    );
  }
  enroll(courseId: number): void {
    const studentId = this.authService.getUserId();
    if (!studentId) {
      console.error('Student ID not found');
      return;
    }
  
    this.isEnrolled(courseId).pipe(
      tap(enrolled => {
        if (enrolled) {
          console.error('Student is already enrolled in this course');
        } else {
          this.isLoading = true;
          this.courseService.addStudentToCourse(courseId, studentId).pipe(
            catchError(error => {
              console.error('Error enrolling student in course', error);
              return EMPTY;
            }),
            finalize(() => {
              this.isLoading = false;
            })
          ).subscribe(() => {
            console.log('Enrollment successful');
            this.myCourses$ = this.studentService.getCoursesByStudent(studentId);
          });
        }
      })
    ).subscribe();
  }
  
  
}

