import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { UpdUserDTO } from '../shared/DTO/UserDto';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentForm: FormGroup;
  studentId: string;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      const idNum = +this.studentId;
      this.studentService.getStudentById(idNum).subscribe({
        next: (student) => {
          console.log('Student loaded:', student);
          this.studentForm.patchValue({
            username: student.userName,
      error: (error) => console.error('Error loading the student:', error)
      });
    }
  })        // Supprimez cette ligne si vos étudiants n'ont pas de propriété role
            // role: student.role

        }
      }
  
  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedUser: UpdUserDTO = {
      id: +this.studentId,
      username: this.studentForm.value.username,
      role: this.studentForm.value.role
      };
  
      this.studentService.updateUser(updatedUser).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/user-table']); // Redirigez vers la page appropriée après la mise à jour
        },
        error: (error) => console.error('Error updating the user:', error)
      });
    }
  }
}