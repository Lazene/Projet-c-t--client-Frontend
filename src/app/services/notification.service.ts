import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationDto } from '../shared/DTO/NotificationDto';
import { Observable } from 'rxjs';
import { AddNotificationDto } from '../shared/DTO/AddNotificationDto';
import { UpdateNotificationDto } from '../shared/DTO/UpdateNotificationDto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = 'https://localhost:7176/api/Notification';

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.API_URL}`);
  }
  addNotification(addNotificationDto: AddNotificationDto): Observable<NotificationDto> {
    return this.http.post<NotificationDto>(`${this.API_URL}/add`, addNotificationDto);
  }
  updateNotification(updateNotificationDto: UpdateNotificationDto): Observable<NotificationDto> {
    return this.http.put<NotificationDto>(`${this.API_URL}/update`, updateNotificationDto);
  }
  getRecentNotifications(): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.API_URL}/recent`);
  }
  getNotification(id: number): Observable<NotificationDto> {
    return this.http.get<NotificationDto>(`${this.API_URL}/${id}`);
  }
}

