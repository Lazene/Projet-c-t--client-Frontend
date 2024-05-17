import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NewUserDTO, UpdUserDTO } from '../shared/DTO/UserDto';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  registerForm: FormGroup;
  roles: string[] = ['admin', 'teacher', 'student']; 
  userId: number; // Add the userId property

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authService: AuthentificationService) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {
    // Charge les rôles depuis le UserService
    this.userId = this.authService.getUserId();
    this.userService.getRoles(this.userId).subscribe({
      next: (data) => {
        this.roles = data;
  
        this.registerForm.get('role').setValidators([Validators.required]);
        this.registerForm.get('role').updateValueAndValidity();
      },
      error: (error) => console.error('Error loading roles:', error)
    });
  }
  
  
  passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password').value;
    const confirmPassword = fg.get('confirmPassword').value;
    if (password !== confirmPassword) {
      fg.get('confirmPassword').setErrors({ passwordMismatch: true });
    }
  }
  submit(): void {
    if (this.registerForm.valid) {
      const newUser: NewUserDTO = {
        username: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role 
      };
  

      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          const updateDto: UpdUserDTO = {
            id: response.id,
            username: response.username,
            role: this.registerForm.value.role 
          };
  
          this.userService.updateUser(updateDto).subscribe({
            next: () => {
              alert('Creating new user:');
              this.router.navigate(['/user-table']);  
              
            },

            error: (error) => console.error('Error updating the user role:', error)
          });
        },
        error: (error) => {
          console.error('Error creating the user:', error);
        }
      });
    }
  }
  


}
