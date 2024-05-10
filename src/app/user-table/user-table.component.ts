import { Component, OnInit } from '@angular/core';
import { User } from '../shared/DTO/UserDto'; 
import { UserService } from '../services/user.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  role : string = "";
  filteredUsers: User[] = [];
  filterId: string = '';
  filterName: string = '';
  filterRole: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  this.role = sessionStorage.getItem("role");
    console.log(this.role);
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = this.filteredUsers = data; // Stockez et initialisez les utilisateurs filtrés
        this.filterUsers(); // Appliquer les filtres initiaux s'ils existent
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      return (this.filterId ? user.id.toString().includes(this.filterId) : true) &&
             (this.filterName ? user.username.toLowerCase().includes(this.filterName.toLowerCase()) : true) &&
             (this.filterRole ? user.role.toLowerCase().includes(this.filterRole.toLowerCase()) : true);
    });
  }
  delete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers(); // Recharger la liste des utilisateurs après suppression
      },
      error: (error) => {
        console.error('Error deleting the user', error);
      }
    });
  }
  edit(id: number): void {
    this.router.navigate(['/user-details', id]);
  }

  sortUsers(users: User[]): User[] {
    return users.sort((a, b) => {
      // Compare les rôles d'abord
      if (a.role < b.role) return -1;
      if (a.role > b.role) return 1;
  
      // Si les rôles sont identiques, compare les noms d'utilisateur
      if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
      if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
  
      return 0;
    });
  }
  createUser(): void {
    this.router.navigate(['/user-add']); // Assurez-vous que le chemin est correct 
}
  
}
