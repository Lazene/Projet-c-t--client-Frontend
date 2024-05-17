import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { NewUserDTO } from '../shared/DTO/UserDto';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthentificationService) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value
      ? null : { 'mismatch': true };
  }

  submit(): void {
    if (this.registerForm.valid) {
      const newStudent: NewUserDTO = {
        username: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        role: 'student'
      };
      this.userService.createUser(newStudent).subscribe({
        next: () => {
          this.router.navigate(['/student-table']);
        },
        error: (error) => {
          console.error('Error creating the student:', error);
        }
      });
    }
  }
}