import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import {Course} from '../shared/DTO/CourseDto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent {

	courses: any;

  constructor(private courseService: CourseService, private router:Router){
//objet router pour naviguer entre les pages
    courseService.getAllCourses().subscribe(x=> {
      this.courses=x;
    })
  }
  ngOnInit(): void {
    // Récupérer tous les cours à l'initialisation
    this.courseService.getCoursesWithTeachers().subscribe(courses => {
      this.courses = courses;
    });
  }

  edit(id: string) {
    this.router.navigate(['/course-add', id]);
  }
  
  
  // creation d'un cours
  CreateCourse(name: string, description: string, teacherName: string) : void{
    this.courseService.addCourse({name, description, teacherName}).subscribe(x=> {
      this.courses.push(x)
    })
  }
  // update un cours
  updateCourse(courseId: string, name: string, description: string, teacherName: string, teacherId: number): void {
    this.courseService.updateCourse(courseId, { name, description, teacherName, teacherId }).subscribe(x=> {
      this.courses.push(x)
    })
  }
  delete(courseId: string, index: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.courses.splice(index, 1); // Supprime le cours du tableau
        },
        error: (error) => {
          console.error('Error deleting the course', error);
          // Gérez l'erreur de suppression ici
        }
      });
    }
  }
  viewCourseDetails(courseId: number ) {
    this.router.navigate(['/course-details', courseId]);
}
sort(property: 'courseName' | 'teacherName') {
  this.courses = [...this.courses].sort((a, b) => {
    const valueA = a[property].toLowerCase();
    const valueB = b[property].toLowerCase();

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  });
  
}


  

}
