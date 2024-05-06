export class UpdateAssignmentDTO {
    assignmentId: number;
    title: string;
    description: string;
    courseId: number;
    deadline: Date;
    gradeValue?: number;  // Optional if you need to pass the grade value during update
}
