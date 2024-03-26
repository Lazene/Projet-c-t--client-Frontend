import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { TeacherDTO } from '../shared/DTO/CourseDto';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  courseForm: FormGroup;
  teachers: TeacherDTO[] = [];
  isUpdate: boolean = false; // Initialisez isUpdate comme faux
  courseId: string | null = null; // courseId peut être null initialement

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      teacher: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id'); // Utilisez paramMap pour récupérer l'ID du cours
      if (this.courseId) {
        this.isUpdate = true; // Si courseId est présent, nous sommes en mode mise à jour
        this.loadCourseData(this.courseId);
      }
    });
    this.loadTeachers();
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
    const courseIdNumber = +this.courseId;
    if (!isNaN(courseIdNumber)) {
      this.courseService.getTeachers(courseIdNumber).subscribe(teachers => {
        this.teachers = teachers;
      });
    } else {
      console.error('courseId is not a valid number');
    }
  }
  

  save(): void {
    // Supposons que teacher est l'ID de l'enseignant sélectionné dans le formulaire
    const selectedTeacherId = this.courseForm.value.teacher;
  
    // Trouvez l'objet enseignant correspondant à l'ID sélectionné
    // Cela suppose que vous avez une liste complète `teachers` chargée quelque part dans votre composant
    const selectedTeacher = this.teachers.find(teacher => teacher.teacherId === selectedTeacherId);
  
    if (selectedTeacher) {
      const courseData = {
        name: this.courseForm.value.name,
        description: this.courseForm.value.description,
        teacherName: selectedTeacher.teacherName,
        teacherId: +selectedTeacherId // Assurez-vous que c'est un nombre si votre API l'attend comme tel
      };
  
      if (this.isUpdate && this.courseId) {
        this.courseService.updateCourse(this.courseId, courseData).subscribe({
          next: () => {
            console.log('Course updated successfully');
            this.router.navigate(['/course-table']);
          },
          error: (error) => {
            console.error('Error updating course', error);
          },
        });
      } else {
        this.courseService.addCourse(courseData).subscribe({
          next: () => {
            console.log('Course added successfully');
            this.router.navigate(['/course-table']);
          },
          error: (error) => {
            console.error('Error adding course', error);
          },
        });
      }
    } else {
      console.error('Selected teacher not found');
    }
  }
  
  
}
