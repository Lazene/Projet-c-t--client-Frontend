export class AssignmentSubmissionDTO {
  assignmentSubmissionId: number;
  studentId: number;
  assignmentId: number;
  assignmentTitle: string;
  assignmentDescription: string;
  isSubmitted: boolean;
  submissionDate?: Date;
  gradeId?: number;
  gradeValue?: number;
}
