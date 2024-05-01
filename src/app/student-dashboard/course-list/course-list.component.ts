import { Component, Input } from '@angular/core';
import { CourseStudent } from '../../shared/DTO/CourseDto';
  // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  @Input() courses: CourseStudent[];  // Recevoir les cours du composant parent

  constructor() { }

  // Vous pouvez ajouter d'autres méthodes pour la logique spécifique aux cours ici
}
