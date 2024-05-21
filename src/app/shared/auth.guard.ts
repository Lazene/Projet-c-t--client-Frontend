// import { CanActivateFn, Router } from '@angular/router';
// import { AuthentificationService } from '../services/authentification.service';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   return inject(AuthentificationService).isAuthentificated()
//   ? true
//   : inject(Router).createUrlTree(['/login']);
// };

import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  if (authService.isAuthentificated()) {
    const userRole = authService.getUserRole();
    const requiredRoles = route.data['roles'] as Array<string>;

    if (requiredRoles && requiredRoles.indexOf(userRole) === -1) {
      // User does not have the required role
      return router.createUrlTree(['/access-denied']);
    }
    // User is authenticated and has the required role
    return true;
  }
  // User is not authenticated
  return router.createUrlTree(['/login']);
};
