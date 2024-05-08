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
  mustChangePassword: boolean = false; 
  
  constructor(private authService: AuthentificationService, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  login() {
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
    .subscribe({
      next: (response) => {
        console.log(response);
        if (response.token) {
          // Stockage des informations de l'utilisateur
          this.authService.setUser(response); 
          // Mettre à jour l'état du changement de mot de passe
          this.mustChangePassword = response.mustChangePassword;
          this.handleNavigation(response);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  handleNavigation(user) {
    if (this.mustChangePassword) {
      this.router.navigate(['/change-password']);
    } else {
      // Redirection basée sur le rôle
      switch (user.role) {
        case 'teacher':
          this.router.navigate(['/teacher-dashboard']);
          break;
        case 'student':
          this.router.navigate(['/student-dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        default:
          this.router.navigate(['/']); // Redirection par défaut
          break;
      }
    }
  }
}
  
  




