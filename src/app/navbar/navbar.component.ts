import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthentificated: boolean;
  private authSubscription: Subscription;


  constructor(private authService: AuthentificationService, private router: Router) {}

  ngOnInit(): void {
    // Initialiser l'état d'authentification
    this.isAuthentificated = this.authService.isAuthentificated();

  }

  ngOnDestroy(): void {
    // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
    this.authSubscription.unsubscribe();
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
