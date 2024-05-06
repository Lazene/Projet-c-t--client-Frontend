import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';
import { DetailedSubmissionDTO } from '../shared/DTO/DetailedSubmissionDTO';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-mynote',
  templateUrl: './mynote.component.html',
  styleUrl: './mynote.component.css'
})
export class MynoteComponent implements OnInit {
  courses: any[] = [];  
  overallAverage: number;
  courseAverage: Map<number, number> = new Map();
  studentId: number;
  detailedSubmissions: DetailedSubmissionDTO[] = [];

  constructor(
    private authService: AuthentificationService,
    private submissionService: AssignmentSubmissionService,
    private studentService: StudentService
  ) {}
  ngOnInit(): void {
    this.studentId = this.authService.getUserId();
    this.loadStudentCourses();
    this.loadAssignementStudent();
      
  }
  loadStudentCourses(): void {
    this.studentService.getCoursesByStudent(this.studentId).subscribe({
      next: (courses) => {
        this.courses = courses;
        if (courses.length > 0) {
          this.loadOverallAverageGrade();
          this.loadCourseAverages();
        }
      },
      error: (error) => console.error('Failed to load courses:', error)
    });
  }

  loadOverallAverageGrade(): void {
    this.submissionService.getOverallAverageGrade(this.studentId).subscribe({
      next: (grade) => this.overallAverage = grade,
      error: (error) => console.error('Failed to load overall grade:', error)
    });
  }

  loadCourseAverages(): void {
    this.courses.forEach(course => {
      this.submissionService.getCourseAverageGrade(this.studentId, course.courseId).subscribe({
        next: (grade) => this.courseAverage.set(course.courseId, grade),
        error: (error) => console.error('Failed to load course grade:', error)
      });
    });
  }

  loadAssignementStudent(): void {
    this.submissionService.getAssignmentsForStudent(this.studentId).subscribe({
      next: (submissions) => this.detailedSubmissions = submissions,
      error: (error) => console.error('Failed to load submissions:', error)
    });
  }
}
