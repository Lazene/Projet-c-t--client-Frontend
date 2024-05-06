export class AssignmentSubmissionDTO {
    assignmentId: number;
    studentId: number;
    gradeId?: number;
    assignment?: Assignment;
    studentName?: string;

  }
  export interface AssignmentSubmission {
    assignmentSubmissionId: number;
    assignmentId: number;
    assigmmentTitle: string;
    assigmmentDescription: string;
    isSubmitted: boolean;
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
      studentName: string;
    },
    grade: {
      gradeId: number;
      value: number;
    }
  }export interface Assignment {
      assignmentId: number;
      title: string;
      description: string;
      courseId: number;
    }
    
  
  

  