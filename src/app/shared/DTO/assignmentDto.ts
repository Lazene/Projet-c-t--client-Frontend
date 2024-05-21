export class AssignmentDTO {
  assignmentId: number;
  title: string;
  description: string;
  courseId: number;
  gradeValueMax: number;  // Optional property if assignments can have a default grade value
}
