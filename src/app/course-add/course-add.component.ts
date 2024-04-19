import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Teacher, Student } from '../shared/DTO/UserDto';
import { TeacherService } from '../services/teacher.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  courseForm: FormGroup;
  teachers: Teacher[] = [];
  students: Student[] = [];
  isUpdate: boolean = false; 
  courseId: string | null = null; 

  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      teacherId: [null, Validators.required],
      studentIds: [null, Validators.required]
    });
  }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id'); 
      if (this.courseId) {
        this.isUpdate = true; 
        this.loadCourseData(this.courseId);
      }
    });
    this.loadTeachers();
    this.loadStudents();
  }

  loadCourseData(courseId: string): void {
    this.courseService.getCourseById(+courseId).subscribe(course => {
      if (course) {
        this.courseForm.patchValue({
          name: course.courseName,
          description: course.courseDescription,
          teacher: course.teachers && course.teachers.length > 0 ? course.teachers[0].teacherId : null
        });
      }

    });
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => {
      console.log('Teachers', teachers);
      this.teachers = teachers;
    });
  }
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(students => {
      console.log('Students', students);
      this.students = students;
    });
  }
  save(): void {
    const selectedTeacherId = this.courseForm.value.teacherId; // Utilisez teacherId
    const selectedTeacher = this.teachers.find(teacher => teacher.teacherId === +selectedTeacherId); // Convertissez selectedTeacherId en nombre
  
    if (selectedTeacher) {
      const courseDataForUpdate = {
        name: this.courseForm.value.name,
        description: this.courseForm.value.description,
        teacherName: selectedTeacher.user.username,
        teacherId: +selectedTeacherId 
      };
  
      const courseDataForAdd = {
        name: this.courseForm.value.name,
        description: this.courseForm.value.description,
        teacherName: selectedTeacher.user.username
      };
  
      if (this.isUpdate && this.courseId) {
        this.courseService.updateCourse(this.courseId, courseDataForUpdate).subscribe({
          next: () => {
            console.log('Course updated successfully');
            this.router.navigate(['/course-table']);
          },
          error: (error) => {
            console.error('Error updating course', error);
          },
        });
      } else {
        this.courseService.addCourse(courseDataForAdd).subscribe({
          next: () => {
            console.log('Course added successfully');
            this.router.navigate(['/course-table']);
          },
          error: (error) => {
            console.error('Error adding course', error);
          },
        });
      }
    }
  }
  
}
