import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  courses$: Observable<Course[]>;
  initialCoursesState: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.enrolledForm = this.fb.group({
      username: [''],
      courses: this.fb.group({})
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.loadCourses();
  }

  loadCourses(): void {
    this.courses$ = this.courseService.getAllCourses();
    const hisCourses$ = this.studentService.getCoursesByStudent(+this.studentId);

    combineLatest([this.courses$, hisCourses$])
      .pipe(
        map(([allCourses, hisCourses]) => {
          const coursesFormGroup = this.enrolledForm.get('courses') as FormGroup;
          allCourses.forEach(course => {
            const enrolled = !!hisCourses.find(hc => hc.courseId === course.courseId);
            this.initialCoursesState[course.courseId] = enrolled;
            // Assurez-vous que le contrôle existe avant d'essayer de l'ajouter
            if (!coursesFormGroup.get('course_' + course.courseId)) {
              coursesFormGroup.addControl('course_' + course.courseId, new FormControl(enrolled));
            }
          });
          return allCourses;
        })
      ).subscribe();
  }

  onSubmit(): void {
    const selectedCourses = this.enrolledForm.get('courses').value;
    Object.keys(selectedCourses).forEach(key => {
      const courseId = +key.split('_')[1];
      const enrolled = selectedCourses[key];
      const initiallyEnrolled = this.initialCoursesState[courseId];

      if (enrolled && !initiallyEnrolled) {
        this.courseService.addStudentToCourse(courseId, +this.studentId).subscribe({
          next: response => alert(`Enrolled in course ID ${courseId}:`),
          error: error => console.error(`Error enrolling in course ID ${courseId}:`, error)
        });
      } else if (!enrolled && initiallyEnrolled) {
        this.courseService.removeStudentFromCourse(courseId, +this.studentId).subscribe({
          next: response => console.log(`Unenrolled from course ID ${courseId}:`, response),
          error: error => console.error(`Error unenrolling from course ID ${courseId}:`, error)
        });
      }
    });
  }
}
