import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service'; // Assurez-vous d'avoir ce service prêt

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  teacherId: number | undefined;

  constructor(private authService: AuthentificationService) {}

  ngOnInit(): void {
   
    this.teacherId = this.authService.getUserId(); 
  }
}
