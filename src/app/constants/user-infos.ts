import { InjectionToken, inject } from '@angular/core';
import { UserInfos } from '../interfaces/user';
import { EncryptStorageService } from '../services/encrypt-storage/encrypt-storage.service';

export function getUserInfos(): UserInfos {
  const encryptStorage = inject(EncryptStorageService);
  const token = encryptStorage.getItem('token');
  const user = encryptStorage.getItem('user');

  return { token, user };
}

export const USER_INFOS = new InjectionToken('USER_INFOS', {
  providedIn: 'root',
  factory: getUserInfos,
});
