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
    console.log('Is authenticated: ', this.authService.isAuthentificated());
   // this.isLoading = true;
    this.courses$=this.courseService.getAllCourses();
    console.log('Courses:', this.courses$);
    this.myCourses$=this.studentService.getCoursesByStudent(this.authService.getUserId());
    console.log('My courses:', this.myCourses$);
    console.log(this.authService.getUserId());
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
      console.log('Enrollment successful');
      // Rafraîchir la liste des cours auxquels l'étudiant est inscrit
      this.myCourses$ = this.studentService.getCoursesByStudent(studentId);
      // Ajoutez également l'ID du cours à l'ensemble des IDs de cours inscrits
      this.enrolledCourseIds.add(courseId);
    });
  }
  
  
  
}

