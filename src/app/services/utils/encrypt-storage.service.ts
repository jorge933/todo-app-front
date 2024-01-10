import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptStorageService {
  private encryptStorage = new EncryptStorage(environment.SECRET_KEY);

  setItem(key: string, value: string) {
    this.encryptStorage.setItem(key, value);
  }

  getItem(key: string) {
    const item = this.encryptStorage.getItem(key);
    return item;
  }
}
