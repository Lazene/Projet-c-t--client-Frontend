import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { StudentDTO, TeacherDTO } from '../shared/DTO/CourseDto';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: number;
  courseName: string;
  courseDetails: any; 
  students: StudentDTO[] = [];
  teachers: TeacherDTO[] = []; 

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseId = +id;
    this.loadCourseDetails();
    this.loadStudents();
    this.loadTeachers();
  }
  

  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.courseDetails = course;
    });
  }
  // recupérer les profs

  loadTeachers(): void {
    this.courseService.getTeachers(this.courseId).subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (error) => {
        console.error('Failed to load teachers', error);
      }
    });
  }
  
  

  loadStudents(): void {
      this.courseService.getStudentsByCourse(this.courseId).subscribe({
       next : (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Failed to load students', error);
      }
      });
    
  }  
  
}
