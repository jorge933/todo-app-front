import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { getUserInfos } from '../functions/user-infos';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const { token } = getUserInfos();
  const router = inject(Router);

  if (!token) router.navigate(['auth/login']);

  return !!token;
};
