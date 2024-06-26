import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { User, UserDTO } from '../shared/DTO/UserDto';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthentificated: boolean = false;
  userRole?: string;
  private authSubscription?: Subscription;
  private roleSubscription?: Subscription;


  constructor(private authService: AuthentificationService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthentificated = isAuthenticated;
        if (isAuthenticated) {
          // Si l'utilisateur est authentifié, obtenez le rôle
          this.authService.userRole$.subscribe((role: string) => {
            this.userRole = role;
          });
        }
      }
    );
  }  
ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.roleSubscription?.unsubscribe();
  }

  logout() {
    // Appeler la méthode logout() du service d'authentification
    this.authService.logout();
   this.router.navigate(['/login']);
  }
  refreshAuthentication() {
    this.isAuthentificated = this.authService.isAuthentificated(); // Mettez à jour l'état d'authentification
  }

}
