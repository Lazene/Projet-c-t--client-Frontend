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
        if (response.token) {
          // Stockage des informations de l'utilisateur
          this.authService.setUser(response); 
          // Mettre à jour l'état du changement de mot de passe
          this.mustChangePassword = response.mustChangePassword;
          if (this.mustChangePassword) {
            this.promptPasswordChange();
          } else {
            this.handleNavigation(response);
          }
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  promptPasswordChange() {
    const confirmChange = window.confirm("You need to change your password. Click OK to proceed to the password change page.");
    if (confirmChange) {
      this.router.navigate(['/change-password']);
    }
  }

  handleNavigation(user) {
    if (!this.mustChangePassword) {
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
          this.router.navigate(['/']);
          break;
      }
    }
  }
}
  
  




