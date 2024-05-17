import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/DTO/CourseDto';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, finalize} from 'rxjs';

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
  private enrolledCourseIds = new Set<number>();

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private authService: AuthentificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.courses$=this.courseService.getAllCourses();
    this.myCourses$=this.studentService.getCoursesByStudent(this.authService.getUserId());
    this.myCourses$.subscribe(courses => {
      this.enrolledCourseIds.clear();
      courses.forEach(course => this.enrolledCourseIds.add(course.courseId));
    });
  }


  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.has(courseId);
  }
  enroll(courseId: number): void {
    const studentId = this.authService.getUserId();
    
    // Vérifiez si l'étudiant est déjà inscrit au cours
    if (this.isEnrolled(courseId)) {
      console.error('Student is already enrolled in this course');
      return;
    }
  
    // Si non inscrit, procéder à l'inscription
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
      this.myCourses$ = this.studentService.getCoursesByStudent(studentId);

      this.enrolledCourseIds.add(courseId);
    });
  }
  
  
  
}

