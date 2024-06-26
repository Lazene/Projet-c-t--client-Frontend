import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { TeacherService } from '../services/teacher.service';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';
import { map} from 'rxjs';
import { GradeAssignmentDTO } from '../shared/DTO/GradeAssignmentDTO';
import { SubmissionDTO } from '../shared/DTO/SubmissionDTO';
import { DetailedSubmissionDTO } from '../shared/DTO/DetailedSubmissionDTO';


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
 
    private assignmentSubmissionService: AssignmentSubmissionService, 
   
  ) {}
  ngOnInit(): void {
  this.teacherId = this.authService.getUserId();
    this.loadTeacherCourses();
  }
  
  loadTeacherCourses(): void {
    const teacherId = this.teacherId;
    this.teacherService.getCoursesByTeacher(teacherId).subscribe({
      next: (courses) => {
        this.courses = courses;
        if (this.courses.length > 0) {
          this.loadSubmissionsForAllCourses();
        } else {
          alert('No courses found for teacher');
        }
      },
      error: (error) => console.error('Failed to load courses:', error)
    });
  }
  
  loadSubmissionsForAllCourses(): void {
    const today = new Date();
    this.courses.forEach(course => {
      this.assignmentSubmissionService.getSubmittedAssignmentsAllByCourse(course.courseId)
        .pipe(
          map(submissions => submissions.map(submission => {
            if (new Date(submission.deadline) < today && !submission.isSubmitted) {
             this.assignmentSubmissionService.gradeAssignment({ submissionId: submission.assignmentSubmissionId, gradeValue: 0 }).subscribe({ 
                next: () => {
                  alert('Grade added successfully');
                },
                error: (error) => {
                  console.error('Failed to add grade', error);
                }
              });
              this.assignmentSubmissionService.submitAssignmentBySubmissionId(submission.assignmentSubmissionId).subscribe({
                next: () => {
                  alert('Assignment submitted successfully');
                },
                error: (error) => {
                  alert('Failed to submit assignment');
                }
              });
            }
            return submission;
          }))
        )
        .subscribe({
          next: (submissions: DetailedSubmissionDTO[]) => {
            course.submissions = submissions;
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
        this.processing = false;  // Arrêt du traitement
      },
      error: (error) => {
      
        this.processing = false;  // Arrêt du traitement même en cas d'erreur
      }
    });
  }
  
  updateGrade(submissionId: number, gradeValue: number): void {
    this.processing = true;  // Début du traitement
    const updateDto: GradeAssignmentDTO = { submissionId, gradeValue };
    this.assignmentSubmissionService.gradeAssignment(updateDto).subscribe({
      next: () => {
        alert('Grade updated successfully');
        this.processing = false;  // Arrêt du traitement
      },
      error: (error) => {
        this.processing = false;  // Arrêt du traitement même en cas d'erreur
      }
    });
  }

  toggleCourse(course: any): void {
    course.isOpen = !course.isOpen;  // This will toggle the course view
  }
  
  
}
