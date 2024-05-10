import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { AuthentificationService } from '../services/authentification.service';
import { NotificationDto } from '../shared/DTO/NotificationDto';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: NotificationDto[] = [];
  notificationForm: FormGroup;
  editing = false;
  currentNotificationId: number | null = null;

  constructor(private notificationService: NotificationService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.notificationForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: (error) => console.error('Failed to load notifications', error)
    });
  }

  addOrUpdateNotification() {
    if (this.notificationForm.valid) {
      const userId = this.authService.getUserId();
      const notificationDto = {
        title: this.notificationForm.value.title,
        description: this.notificationForm.value.description,
        userId: userId,
        created: new Date()
      };

      if (this.editing && this.currentNotificationId) {
        const updateDto = { ...notificationDto, notificationId: this.currentNotificationId };
        this.notificationService.updateNotification(updateDto).subscribe(() => this.resetForm());
      } else {
        this.notificationService.addNotification(notificationDto).subscribe(() => this.resetForm());
      }
    }
  }

  resetForm() {
    this.notificationForm.reset();
    this.editing = false;
    this.currentNotificationId = null;
    this.loadNotifications();
  }

  setForEdit(notification: NotificationDto) {
    this.notificationForm.setValue({ title: notification.title, description: notification.description });
    this.currentNotificationId = notification.notificationId;
    this.editing = true;
  }


}
