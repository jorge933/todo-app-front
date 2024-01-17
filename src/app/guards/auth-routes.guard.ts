import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { getUserInfos } from '../functions/user-infos';
import { inject } from '@angular/core';

export const authRoutesGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const { token } = getUserInfos();
  const router = inject(Router);

  if (token) router.navigate(['tasks']);

  return !token;
};
