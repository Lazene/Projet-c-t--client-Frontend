export class AddGradeDTO {
    studentId: number;
    courseId: number;
    grade: number;
    // Ajoutez d'autres propriétés si nécessaire
  }
  
  export class UpdateGradeDTO {
    gradeId: number;
    studentId: number;
    courseId: number;
    grade: number;
    // Ajoutez d'autres propriétés si nécessaire
  }