import { Component, OnInit } from '@angular/core';
import { CourseStudent } from '../shared/DTO/CourseDto';
import { AssignmentDTO } from '../shared/DTO/AssignmentDTO';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { AuthentificationService } from '../services/authentification.service';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';
import { DetailedSubmissionDTO } from '../shared/DTO/DetailedSubmissionDTO';
import { NotificationService } from '../services/notification.service';
import { NotificationDto } from '../shared/DTO/NotificationDto';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  courses: CourseStudent[] = [];
  assignments: AssignmentDTO[] = [];
  studentId: number;
  assignmentSubmissions: DetailedSubmissionDTO[] = [];
  overallAverage: number;
  notification: NotificationDto[] = [];

  constructor(
    private studentService: StudentService, 
    private assignmentSubmissionService: AssignmentSubmissionService,
   private readonly notificationService: NotificationService,
    private authService: AuthentificationService
  ) {}

  ngOnInit() {
    this.studentId = this.authService.getUserId();  // It's good to fetch user data on init
    this.loadStudentCourses();
    this.loadStudentAssignments();
    this.loadOverallAverageGrade();
    this.loadNotifications();
  }

  loadStudentCourses() {
    if(this.studentId) {
      this.studentService.getCoursesByStudent(this.studentId).subscribe({
        next: (courses) => this.courses = courses,
        error: (err) => console.error('Failed to load courses', err)
      });
    }
  }

  loadStudentAssignments() {
    if(this.studentId) {
      this.studentService.getAssignmentsByStudentId(this.studentId).subscribe({
        next: (assignments) => this.assignments = assignments,
        error: (err) => console.error('Failed to load assignments', err)
      });
    }
  }
  loadOverallAverageGrade() {
    if (this.studentId) {
      this.assignmentSubmissionService.getOverallAverageGrade(this.studentId).subscribe({
        next: (grade) => {
          this.overallAverage = grade;  // Make sure you are setting it here
          console.log('Overall grade:', grade);
        },
        error: (err) => console.error('Failed to load overall grade:', err)
      });
    }
  }
  loadNotifications() {
    this.notificationService.getRecentNotifications().subscribe({
      next: (data) => {
        this.notification = data;
        console.log('Notifications:', data);
      },
      error: (error) => console.error('Failed to load notifications', error)
      
    });
  }
  
}
