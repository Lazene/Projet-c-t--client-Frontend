export interface SubmissionDTO {
    assignmentSubmissionId: number;
    studentId: number;
    isSubmitted: boolean;
    gradeValue: number | null;
    studentName: string;
    assignmentTitle: string;
  }
  