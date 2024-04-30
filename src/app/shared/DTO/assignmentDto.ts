export class AddAssignmentDTO {
    title: string;
    description: string;
    courseId: number;
    // Ajoutez d'autres propriétés si nécessaire
  }
  
  export class UpdateAssignmentDTO {
    assignmentId: number;
    title: string;
    description: string;
    courseId: number;
    // Ajoutez d'autres propriétés si nécessaire
  }

export class AssignmentDTO {
    assignmentId: number;
    title: string;
    description: string;
    courseId: number;
    // Ajoutez d'autres propriétés si nécessaire
  }