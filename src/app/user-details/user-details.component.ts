import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User, UpdUserDTO } from '../shared/DTO/UserDto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Assurez-vous que l'ID est converti en number si votre API s'attend à un number
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      // Conversion de string à number si nécessaire
      const idNum = +this.userId;
      this.userService.getUserById(idNum).subscribe({
        next: (user) => {
          console.log('User loaded:', user);
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
        userName: this.userForm.value.username,
        role: this.userForm.value.role
      };
  
      this.userService.updateUser(updatedUser).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/user-table']); // Redirigez vers la page appropriée après la mise à jour
        },
        error: (error) => console.error('Error updating the user:', error)
      });
    }
  }
}
