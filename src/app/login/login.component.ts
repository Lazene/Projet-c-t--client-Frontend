import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  loginForm: FormGroup;

  
  constructor(private authService: AuthentificationService, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  login(){
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
    .subscribe(response => {
      console.log(response);
      if(response.token){
        sessionStorage.setItem("jwt", response.token);
        sessionStorage.setItem("username", response.username);
        sessionStorage.setItem("role", response.role);
        sessionStorage.setItem("id", response.id);
        const userId = this.authService.getUserId();
console.log('Current User ID:', userId);
switch (response.role) {
  case 'teacher':
    this.router.navigate(['/teacher-dashboard']); // Modifiez selon votre chemin de tableau de bord de l'enseignant
    break;
  case 'student':
    this.router.navigate(['/student-dashboard']); // Modifiez selon votre chemin de tableau de bord de l'étudiant
    break;
  case 'admin':
    this.router.navigate(['/admin-dashboard']); // Modifiez selon votre chemin de tableau de bord de l'administrateur
    break;
  default:
    this.router.navigate(['/']); // Page d'accueil ou tableau de bord par défaut
    break;
      }
    }
    });

    }

  }
  




