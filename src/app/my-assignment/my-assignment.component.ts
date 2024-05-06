import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { AssignmentSubmissionService } from '../services/assignment-submission.service';
import { DetailedSubmissionDTO } from '../shared/DTO/DetailedSubmissionDTO';

@Component({
  selector: 'app-my-assignment',
  templateUrl: './my-assignment.component.html',
  styleUrls: ['./my-assignment.component.css']
})
export class MyAssignmentComponent implements OnInit {
  submissions: DetailedSubmissionDTO[] = [];
  studentId?: number;

  constructor(
    private authService: AuthentificationService,
    private submissionService: AssignmentSubmissionService
  ) {}

  ngOnInit(): void {
    this.studentId = this.authService.getUserId();
    this.loadStudentAssignments();
  }

  loadStudentAssignments(): void {
    if (!this.studentId) {
      console.error('ID étudiant non disponible.');
      return;
    }

    this.submissionService.getAssignmentsForStudent(this.studentId).subscribe({
      next: (submissions: DetailedSubmissionDTO[]) => {
        this.submissions = submissions.map(submission => {
          // Vous pouvez ici traiter les données si nécessaire, par exemple:
          // conversion des dates de format string à Date object, etc.
          submission.submissionDate = submission.submissionDate ? new Date(submission.submissionDate) : undefined;
          return submission;
        });
        console.log('Soumissions chargées:', this.submissions);
      },
      error: (error) => console.error('Erreur lors de la récupération des soumissions:', error)
    });
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

