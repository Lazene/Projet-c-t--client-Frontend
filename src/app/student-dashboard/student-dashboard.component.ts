import { Component, OnInit } from '@angular/core';
import { CourseStudent } from '../shared/DTO/CourseDto';
import { AssignmentDTO } from '../shared/DTO/assignmentDto';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service';
import { AuthentificationService } from '../services/authentification.service';
import { AssignmentSubmission } from '../shared/DTO/assignment-submssionDto';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  courses: CourseStudent[] = [];
  assignments: AssignmentDTO[] = [];
  studentId: number;
  assignmentSubmissions: AssignmentSubmission[] = [];
  

  constructor(
    private studentService: StudentService, 
    private assignmentSubmissionService: AssignmentSubmissionService,
    private courseService: CourseService, 
    private authService: AuthentificationService
  ) {}

  ngOnInit() {
    this.studentId = this.authService.getUserId();  // It's good to fetch user data on init
    this.loadStudentCourses();
    this.loadStudentAssignments();
    this.loadStudentAssignmentSubmissions();
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
  loadStudentAssignmentSubmissions() {
    if(this.studentId) {
      this.assignmentSubmissionService.getAssignmentsForStudent(this.studentId).subscribe({
        next: (submissions) => this.assignmentSubmissions = submissions,
        error: (err) => console.error('Failed to load assignment submissions', err)
      });
    }
  }
}

