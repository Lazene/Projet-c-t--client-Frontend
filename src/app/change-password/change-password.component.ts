import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']  // Correction ici pour styleUrls
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  userId: number;

  constructor(private authService: AuthentificationService, private router: Router) {
    this.changePasswordForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup): ValidationErrors | null {
    const newPassword = g.get('newPassword').value;
    const confirmPassword = g.get('confirmPassword').value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  
  

  submit() {
    if (this.changePasswordForm.valid) {
    this.authService.login(
      this.changePasswordForm.value.userName, 
      this.changePasswordForm.value.oldPassword
    ).subscribe({
      next: (response) => {
        this.userId = response.userId;
        this.changePassword();
        },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
    }}

   changePassword() {
    if (this.userId && this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword) {
      this.authService.changePassword(
        this.userId, 
        this.changePasswordForm.value.oldPassword, 
        this.changePasswordForm.value.newPassword
      ).subscribe({
        next: () => {
          console.log('Password changed successfully');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Change password failed:', error);
        }
      });
    }
  }
}
