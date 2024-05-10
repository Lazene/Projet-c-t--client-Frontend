import { Component, OnInit } from "@angular/core";
import { StudentDetailsDto } from "../shared/DTO/StudentDetailsDto";
import { AuthentificationService } from "../services/authentification.service";
import { TeacherService } from "../services/teacher.service";
import { CourseService } from "../services/course.service";
import { AssignmentSubmissionService } from "../services/assignment-submission.service";
import { StudentDTO } from "../shared/DTO/CourseDto";
@Component({
  selector: 'app-students-list-teacher',
  templateUrl: './students-list-teacher.component.html',
  styleUrls: ['./students-list-teacher.component.css']
})

export class StudentsListTeacherComponent implements OnInit {
  courses: any[] = [];  // Assurez-vous que ce tableau peut contenir les détails des étudiants
  teacherId: number;

  constructor(
    private authService: AuthentificationService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private assignmentService: AssignmentSubmissionService
  ) {}

  ngOnInit(): void {
    this.teacherId = this.authService.getUserId();
    this.loadCourses();
  }

  loadCourses(): void {
    this.teacherService.getCoursesByTeacher(this.teacherId).subscribe({
      next: courses => {
        this.courses = courses.map(course => ({ ...course, studentsDetails: [] }));  // Initialiser chaque cours avec un tableau de détails des étudiants
        this.loadStudentsAndAssignments();
      },
      error: error => console.error('Failed to load courses:', error)
    });
  }

  loadStudentsAndAssignments(): void {
    this.courses.forEach((course, index) => {
      this.courseService.getStudentsByCourse(course.courseId).subscribe({
        next: students => {
          if (students.length > 0) {
            this.loadAssignmentsForCourse(course, index, students);
          }
        },
        error: error => console.error('Failed to load students:', error)
      });
    });
  }

  loadAssignmentsForCourse(course: any, courseIndex: number, students: StudentDTO[]): void {
    students.forEach(student => {
      this.assignmentService.getSubmissionsByStudentAndCourse(student.studentId, course.courseId).subscribe({
        next: submissions => {
          const studentDetail = {
            studentId: student.studentId,
            username: student.userName,
            totalAssignments: submissions.length,
            submittedAssignments: submissions.filter(sub => sub.isSubmitted).length,
            averageGrade: submissions.reduce((acc, curr) => acc + (curr.gradeValue || 0), 0) / (submissions.length || 1)
          };
          this.courses[courseIndex].studentsDetails.push(studentDetail);  // Ajouter les détails de l'étudiant au cours correspondant
        },
        error: error => console.error('Failed to load submissions:', error)
      });
    });
  }
}
