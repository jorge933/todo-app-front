import { inject } from '@angular/core';
import { UserInfos } from '../interfaces/user';
import { StorageService } from '../services/storage/storage.service';

export function getUserInfos() {
  const storageService = inject(StorageService);
  const userInfos = storageService.getMultipleItems<UserInfos>([
    'token',
    'user',
  ]);

  return userInfos;
}
