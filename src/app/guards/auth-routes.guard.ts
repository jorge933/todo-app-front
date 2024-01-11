import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { USER_INFOS } from '../constants/user-infos';
import { inject } from '@angular/core';

export const authRoutesGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const { token } = inject(USER_INFOS);
  const router = inject(Router);

  if (token) router.navigate(['/tasks']);

  return !token;
};
