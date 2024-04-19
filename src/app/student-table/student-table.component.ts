import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student, User } from '../shared/DTO/UserDto';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.css'
})
export class StudentTableComponent {

  student: Student[] = [];
  role : string = "";

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
   
  this.role = sessionStorage.getItem("role");
    console.log(this.role);
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        console.log(data); // Ajoutez cette ligne
        this.student = this.sortUsers(data);
        data.forEach(student => {
          console.log('ID:', student.studentId);
          console.log('Username:', student.username);
        });
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  delete(id: number): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.loadStudents(); // Recharger la liste des utilisateurs après suppression
      },
      error: (error) => {
        console.error('Error deleting the user', error);
      }
    });
  }
  edit(id: number): void {
    this.router.navigate(['/student-details', id]);
  }

  sortUsers(users: Student[]): Student[] {
    return users.sort((a, b) => {
      if (a.userName && b.userName) {
        return a.userName.localeCompare(b.userName);
      } else {
        return 0;
      }
    });
  }
  createUser(): void {
    this.router.navigate(['/student-add']); 
}
enrolled(arg0: number) {
  throw new Error('Method not implemented.');
  }

}
