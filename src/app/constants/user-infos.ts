import { InjectionToken, inject } from '@angular/core';
import { UserInfos } from '../interfaces/user';
import { EncryptStorageService } from '../services/storage/storage.service';

export function getUserInfos(): UserInfos {
  const encryptStorage = inject(EncryptStorageService);
  const userInfos = encryptStorage.getMultipleItems<UserInfos>([
    'token',
    'user',
  ]);

  return userInfos as UserInfos;
}

export const USER_INFOS = new InjectionToken('USER_INFOS', {
  providedIn: 'root',
  factory: getUserInfos,
});
