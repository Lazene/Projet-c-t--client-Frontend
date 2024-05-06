import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { TeacherService } from '../services/teacher.service';
import { CourseService } from '../services/course.service';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';
import { forkJoin, map, of } from 'rxjs';
import { GradeService } from '../services/grade.service';
import { GradeAssignmentDTO } from '../shared/DTO/GradeAssignmentDTO';
import { UpdateGradeDTO } from '../shared/DTO/gradeDto';
import { StudentService } from '../services/student.service';
import { SubmissionDTO } from '../shared/DTO/SubmissionDTO';


@Component({
  selector: 'app-assignment-grade',
  templateUrl: './assignment-grade.component.html',
  styleUrls: ['./assignment-grade.component.css']
})
export class AssignmentGradeComponent implements OnInit {
  courses: any[] = [];
  submissions: SubmissionDTO[] = [];
  teacherId: number | undefined;
  processing: boolean = false;


  constructor(
    private authService: AuthentificationService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private assignmentSubmissionService: AssignmentSubmissionService, 
    private gradeService: GradeService
  ) {}
  ngOnInit(): void {
  this.teacherId = this.authService.getUserId();
   console.log(this.teacherId);
    this.loadTeacherCourses();
  }
  
  loadTeacherCourses(): void {
    const teacherId = this.teacherId;
    console.log('Teacher ID:', teacherId);
    this.teacherService.getCoursesByTeacher(teacherId).subscribe({
      next: (courses) => {
        this.courses = courses;
        console.log('Courses loaded:', this.courses);
        if (this.courses.length > 0) {
          this.loadSubmissionsForAllCourses();
        } else {
          console.log('No courses found for teacher');
        }
      },
      error: (error) => console.error('Failed to load courses:', error)
    });
  }
  
  loadSubmissionsForAllCourses(): void {
    this.courses.forEach(course => {
      this.assignmentSubmissionService.getSubmittedAssignmentsAllByCourse(course.courseId)
        .subscribe({
          next: (data: SubmissionDTO[]) => {
            course.submissions = data;
            console.log(`Submissions loaded for course ${course.courseId}:`, data);
          },
          error: (error) => console.error(`Failed to load submissions for course ${course.courseId}:`, error)
        });
    });
  }
  
  
  
  addGrade(submissionId: number, gradeValue: number): void {
    this.processing = true;  // Début du traitement
    const gradeDto: GradeAssignmentDTO = { submissionId, gradeValue };
    this.assignmentSubmissionService.gradeAssignment(gradeDto).subscribe({
      next: () => {
        console.log('Grade added successfully');
        this.processing = false;  // Arrêt du traitement
      },
      error: (error) => {
        console.error('Failed to add grade', error);
        this.processing = false;  // Arrêt du traitement même en cas d'erreur
      }
    });
  }
  
  updateGrade(submissionId: number, gradeValue: number): void {
    this.processing = true;  // Début du traitement
    const updateDto: GradeAssignmentDTO = { submissionId, gradeValue };
    this.assignmentSubmissionService.gradeAssignment(updateDto).subscribe({
      next: () => {
        console.log('Grade updated successfully');
        this.processing = false;  // Arrêt du traitement
      },
      error: (error) => {
        console.error('Failed to update grade', error);
        this.processing = false;  // Arrêt du traitement même en cas d'erreur
      }
    });
  }
  checkSubmissionStatus(submission): void {
    this.assignmentSubmissionService.getAssignementStatus(submission.assignmentSubmissionId).subscribe({
      next: (status) => {
        if (status.isSubmitted) {
          this.submissions.push(submission);
        }
      },
      error: (error) => console.error('Error fetching submission status:', error)
    });
  }
  toggleCourse(course: any): void {
    course.isOpen = !course.isOpen;  // This will toggle the course view
  }
  
  
}
