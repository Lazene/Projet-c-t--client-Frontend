import { Component, Input } from '@angular/core';
import { CourseStudent } from '../../shared/DTO/CourseDto';
 

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  @Input() courses: CourseStudent[];  // Recevoir les cours du composant parent

  constructor() { }

  
}
