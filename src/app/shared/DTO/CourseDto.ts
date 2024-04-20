interface Teacher {
    teacherId: string;
    teacherName: string;
  
  }
  
  interface Student {
    studentId: string;
    name: string;

  }
  
  class Course {
    courseId: string | undefined;
    courseName: string | undefined;
    courseDescription: string | undefined;
    teachers: Teacher[] = []; 
    students: Student[] = []; 
  }

class CourseStudent {
    courseId: string | undefined;
    studentId: string | undefined;
    studentName: string | undefined;
}
class CourseTeacher {
    courseId: string | undefined;
    teacherId: string | undefined;
    teachzerName: string | undefined;

}
class CourseUpdate {
    courseId?: string;
    courseName?: string;
    courseDescription?: string;
  }
class CourseAdd {
    courseName: string | undefined;
    courseDescription: string | undefined;
}
export interface StudentDTO {
    studentId: string; // Assurez-vous que cela correspond au type utilisé par votre API
    studentName: string;
    // Courses est optionnel, selon que vous avez besoin de cette information ici
  }
export interface TeacherDTO {
    teacherId: string;
    teacherName: string;
  }
  

export { CourseUpdate };
export { CourseTeacher};
export { CourseStudent };
export { Course };
export { CourseAdd };