import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { USER_INFOS } from '../constants/user-infos';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const { token } = inject(USER_INFOS);
  const router = inject(Router);

  if (!token) router.navigate(['/auth/login']);

  return !!token;
};
