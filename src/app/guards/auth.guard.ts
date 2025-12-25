import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';

export const authGuard: (...roles: Role[]) => CanActivateFn = (roles) => {
  return (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.user) {
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

  if (auth.isLoggedIn) {
    router.navigate(['/']);

    return false;
  }

  return true;
};
