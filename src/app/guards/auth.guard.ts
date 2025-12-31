import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

export const authGuard: (...roles: Role[]) => CanActivateFn = (roles) => {
  return (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isLoggedIn()) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (!auth.hasRoles(roles)) {
      router.navigate(['/forbidden']);
    }

    return true;
  };
};

export const notAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const returnUrl = route.queryParams['returnUrl'];

  if (auth.isLoggedIn()) {
    router.navigateByUrl(returnUrl || '/');
    return false;
  }

  return true;
};
