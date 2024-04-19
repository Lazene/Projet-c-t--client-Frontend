import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NewUserDTO } from '../shared/DTO/UserDto';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  registerForm: FormGroup;
  roles: string[] = ['Admin', 'User', 'student']; 
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
        this.roles = data; // 'data' est un tableau de rôles
        // Met à jour le champ 'role' pour qu'il soit requis
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
  
      // Appelez la méthode createUser de votre UserService
      console.log('Creating new user:', newUser);
      this.userService.createUser(newUser).subscribe({
        
        next: () => {
          // Redirection vers la liste des utilisateurs ou affichage d'un message de succès
          this.router.navigate(['/user-table']);
        },
        error: (error) => {
          // Affichage d'un message d'erreur
          console.error('Error creating the user:', error);
        }
      });
    }
  }
  

 
  
  

}
