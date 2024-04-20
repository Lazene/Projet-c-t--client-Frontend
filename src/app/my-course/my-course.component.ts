import { Component, OnInit } from '@angular/core';
import { Course } from '../shared/DTO/CourseDto';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.css'
})
export class MyCourseComponent implements OnInit{
  availableCourses: Course[] = [];
  myCourses: Course[] = [];
  isLoading: boolean = false;
 
  constructor(private courseService: CourseService, private studentService: StudentService, private authService : AuthentificationService) {}

  ngOnInit(): void {
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
  enroll(courseId: string): void {
    const studentId = this.authService.getUserId();
    console.log(`Attempting to enroll studentId: ${studentId} to courseId: ${courseId}`);
  
    if (studentId) {
      this.courseService.addStudentToCourse(courseId, String(studentId)).subscribe(
        response => {
          console.log('Enrollment successful:', response);
          this.loadMyCourses(); // Recharge les cours pour mettre à jour l'interface utilisateur
        },
        error => {
          console.error('Error enrolling student in course:', error);
          // Gérer ici les erreurs spécifiques, par exemple une réponse 401/403 pourrait signifier que vous devez revalider l'authentification ou rafraîchir le token
          if (error.status === 401 || error.status === 403) {
            console.log('Authentication error detected, handling it...');
            // Ajouter ici une logique pour rafraîchir le token ou rediriger vers la page de connexion
          }
        }
      );
    } else {
      console.error('Student ID not found, unable to enroll');
    }
  }
  


}
