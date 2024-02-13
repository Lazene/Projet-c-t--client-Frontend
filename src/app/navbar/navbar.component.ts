import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthentificated: boolean;
  private authSubscription: Subscription;

  constructor(private authService: AuthentificationService) {}

  ngOnInit(): void {
    // Initialiser l'état d'authentification
    this.isAuthentificated = this.authService.isAuthentificated();

    // S'abonner aux changements de l'état d'authentification
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      isAuthenticated => this.isAuthentificated = isAuthenticated
    );
  }

  ngOnDestroy(): void {
    // Se désabonner lors de la destruction du composant pour éviter les fuites de mémoire
    this.authSubscription.unsubscribe();
  }

  logout() {
    // Appeler la méthode logout() du service d'authentification
    this.authService.logout();
  }
}
