import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {  UpdUserDTO } from '../shared/DTO/UserDto';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  resetPasswordForm: FormGroup;
  isResetMode = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthentificationService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.resetPasswordForm.setValidators(this.passwordMatchValidator());
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUserById(+this.userId).subscribe({
        next: (user) => {
          this.userForm.patchValue({
            username: user.username,
            role: user.role
          });
        },
        error: (error) => console.error('Error loading the user:', error)
      });
    }
  }  

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: UpdUserDTO = {
      id: +this.userId,
        username: this.userForm.value.username,
        role: this.userForm.value.role
      };
  
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/user-table']); 
        },
        error: (error) => console.error('Error updating the user:', error)
      });
    }
  }
  resetPassword(): void {
    if (this.resetPasswordForm.valid && this.resetPasswordForm.value.newPassword === this.resetPasswordForm.value.confirmPassword) {
      this.authService.resetPassword(+this.userId, this.resetPasswordForm.value.newPassword).subscribe({
        next: () => this.router.navigate(['/user-table']),
        error: (error) => console.error('Reset password failed:', error)
      });
    } else {
      alert('Passwords do not match');
    }
  }
  toggleResetMode(): void {
    this.isResetMode = !this.isResetMode;
  }

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      let pass = group.get('newPassword').value;
      let confirmPass = group.get('confirmPassword').value
      return pass === confirmPass ? null : { notSame: true }
    };
  }
}
