import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthentificationService).isAuthentificated()
  ? true
  : inject(Router).createUrlTree(['/login']);
};
