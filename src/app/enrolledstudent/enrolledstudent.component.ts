import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { Course } from '../shared/DTO/CourseDto';

@Component({
  selector: 'app-enrolledstudent',
  templateUrl: './enrolledstudent.component.html',
  styleUrls: ['./enrolledstudent.component.css']
})
export class EnrolledstudentComponent implements OnInit {
  enrolledForm: FormGroup;
  studentId: string;
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.enrolledForm = this.fb.group({
      username: [''],
      courses: new FormGroup({})
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.loadCourses();
  }
  

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      const courseControls = courses.reduce((acc, course) => {
        acc['course_' + course.courseId] = new FormControl(false);
        return acc;
      }, {});
      this.enrolledForm.setControl('courses', new FormGroup(courseControls));
    });
  }

  onSubmit(): void {
    const selectedCourses = this.enrolledForm.get('courses').value;
    Object.keys(selectedCourses).forEach(key => {
      if (selectedCourses[key]) {
        const courseId = key.split('_')[1];
        this.courseService.addStudentToCourse(+courseId, +this.studentId).subscribe({
          next: response => console.log(`Enrolled in course ID ${courseId}:`, response),
          error: error => console.error(`Error enrolling in course ID ${courseId}:`, error)
        });
      }
    });
  }
}
