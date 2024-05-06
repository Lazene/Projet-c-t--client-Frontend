import { Component, Input } from '@angular/core';
import { AssignmentDTO } from '../../shared/DTO/AssignmentDTO';
  // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent {
  @Input() assignments: AssignmentDTO[];  // Recevoir les devoirs du composant parent

  constructor() { }

  // Vous pouvez ajouter d'autres méthodes pour la logique spécifique aux devoirs ici
}
