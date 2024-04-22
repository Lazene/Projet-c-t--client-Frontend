import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/DTO/CourseDto';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  availableCourses: Course[] = [];
  myCourses: Course[] = [];
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
    this.isLoading = true;
    this.loadAvailableCourses();
    this.loadMyCourses();
  }

  loadAvailableCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.availableCourses = courses;
      this.isLoading = false;
    });
  }

  loadMyCourses(): void {
    const studentId = this.authService.getUserId();
    if (studentId) {
      this.studentService.getCoursesByStudent(studentId).subscribe(
        courses => {
          this.myCourses = courses;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching courses for student', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('Student ID not found');
      this.isLoading = false;
    }
  }

  enroll(courseId: number): void {
    console.log('Enrolling student...');
    const studentId = this.authService.getUserId();
   
  
    if (studentId) {
      console.log('Before calling addStudentToCourse');
      console.log('Course ID:', courseId);
      console.log('Student ID:', studentId);
  
      this.courseService.addStudentToCourse(courseId, studentId).subscribe({
        next: (response) => {
          if (response === undefined) {
            console.log('Inscription réussie, pas de corps de réponse');
            this.loadMyCourses(); // Recharge les cours pour mettre à jour l'interface utilisateur
          } else {
            console.log('Inscription réussie:', response);
            this.loadMyCourses(); // Recharge les cours pour mettre à jour l'interface utilisateur
          }
        },
        error: (error) => {
          console.error('Une erreur est survenue:', error);
          if (error.status === 401) {
            console.error('L\'étudiant est déjà inscrit au cours');
          } else {
            // Gérez les autres erreurs comme vous le souhaitez
          }
        }
      });
    }
  }
  

  isEnrolled(courseId: any): boolean {
    return this.myCourses.some(course => course.courseId === courseId);
  }

  isCourseAddedSuccessfully(courseId: any): boolean {
    return this.availableCourses.some(course => course.courseId === courseId) && !this.isEnrolled(courseId);
  }

  isEnrollmentFailed(courseId: any): boolean {
    return this.enrollmentStatus[courseId] === false; // Retourne true si l'enrôlement a échoué pour ce courseId
  }
}
