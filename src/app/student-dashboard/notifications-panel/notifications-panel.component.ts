import { Component, Input } from '@angular/core';
import { NotificationDto } from '../../shared/DTO/NotificationDto';

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.css'
})
export class NotificationsPanelComponent {
  @Input() notification: NotificationDto; 
}
