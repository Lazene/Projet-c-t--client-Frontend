export class AssignmentSubmissionDTO {
    assignmentId: number;
    studentId: number;
    gradeId?: number;

  }
  export interface AssignmentSubmission {
    assignmentSubmissionId: number;
    assignmentId: number;
    assigmmentTitle: string;
    assigmmentDescription: string;
    submissionDate: Date;
    studentId: number;
    gradeId: number;
    courseId: number;
    assignment: {
      assignmentId: number;
      title: string;
      description: string;
      courseId: number;
    },
    student: {
      studentId: number;
    },
    grade: {
      gradeId: number;
      value: number;
    }
    // Inclure d'autres champs selon les besoins
  }
  

  