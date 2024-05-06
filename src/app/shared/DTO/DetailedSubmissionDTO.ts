import { AssignmentDTO } from "./AssignmentDTO";

export class DetailedSubmissionDTO {
    assignmentSubmissionId: number;
    assignmentId: number;
    assignmentTitle: string;
    assignmentDescription: string;
    deadline: Date;
    studentId: number;
    studentUsername: string;
    gradeId?: number;
    gradeValue?: number;
    gradeValueMax?: number;
    courseId?: number;
    isSubmitted: boolean;
    submissionDate?: Date;
    assignment?:AssignmentDTO;
}
