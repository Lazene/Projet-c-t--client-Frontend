import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';
import { AssignmentService } from '../services/assignment.service';  // Assurez-vous d'avoir un service pour les Assignments
import {  Assignment, AssignmentSubmission } from '../shared/DTO/assignment-submssionDto';

@Component({
  selector: 'app-my-assignment',
  templateUrl: './my-assignment.component.html',
  styleUrls: ['./my-assignment.component.css']
})
export class MyAssignmentComponent implements OnInit {
  submissions: AssignmentSubmission[] = [];
  isSubmitted?: boolean;
  studentId?: number;

  constructor(
    private authService: AuthentificationService,
    private assignmentService: AssignmentService,
    private submissionService: AssignmentSubmissionService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getUserId();
    this.loadStudentAssignments();
    
  }

  loadStudentAssignments(): void {
 
    if (this.studentId) {
      this.submissionService.getAssignmentsForStudent(this.studentId).subscribe({
        next: (submissions: AssignmentSubmission[]) => {
          this.submissions = submissions;
          // Enrich each submission with assignment data
          this.submissions.forEach(submission => {
            this.assignmentService.getAssignmentById(submission.assignmentId).subscribe({
              next: (assignment: Assignment) => {
                submission.assignment = assignment;
                this.submissionService.getAssignementStatus(submission.assignmentSubmissionId).subscribe({
                  next: (status: boolean) => {
                    submission.isSubmitted = status;
                  },
                  error: (error) => console.error('Error fetching assignment status:', error)
                });
              },
              error: (error) => console.error('Error fetching assignment details:', error)
            });
          });
        },
        error: (error) => console.error('Error fetching submissions:', error)
      });
    } else {
      console.error('Student ID is not available.');
    }
  }
  submitAssignment(assignmentSubmissionId: number): void {
    this.submissionService.submitAssignmentBySubmissionId(assignmentSubmissionId).subscribe({
      next: () => {
        alert('Devoir soumis avec succès.');
        this.loadStudentAssignments();  // Pour rafraîchir les données affichées
      },
      error: (error) => {
        console.error('Erreur lors de la soumission du devoir:', error);
        alert('Échec de la soumission du devoir.');
      }
    });
  }
}
