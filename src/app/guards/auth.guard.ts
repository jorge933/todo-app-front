import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EncryptStorageService } from '../services/encrypt-storage/encrypt-storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const encryptedStorage = inject(EncryptStorageService);
  const router = inject(Router);
  const token = encryptedStorage.getItem('token');

  if (!token) router.navigate(['/auth/login']);

  return !!token;
};
