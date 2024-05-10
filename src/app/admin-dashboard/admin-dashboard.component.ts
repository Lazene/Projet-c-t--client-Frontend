import { Component, OnInit } from '@angular/core';
import { LoginStatisticsDto } from '../shared/DTO/LoginStatisticsDto';
import { NotificationDto } from '../shared/DTO/NotificationDto';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  loginStats: LoginStatisticsDto;
  recentNotification: NotificationDto;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchLoginStatistics();
    this.fetchRecentNotification();
  }

  private fetchLoginStatistics() {
    this.userService.getLoginStatistics().subscribe({
      next: stats => this.loginStats = stats,
      error: error => console.error('Failed to fetch login statistics', error)
    });
  }

  private fetchRecentNotification() {
    this.notificationService.getRecentNotifications().subscribe({
      next: notifications => this.recentNotification = notifications[0], // Assuming the most recent is first
      error: error => console.error('Failed to fetch notifications', error)
    });
  }
}
