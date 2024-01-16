import { Inject, Injectable, Optional } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptStorageService {
  private storage: Storage | EncryptStorage;

  constructor(@Optional() @Inject('storage') storage: Storage) {
    if (storage) {
      this.storage = storage;
    } else {
      const encryptStorage = new EncryptStorage(environment.SECRET_KEY, {
        storageType: 'sessionStorage',
      });

      this.storage = encryptStorage;
    }
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem<T>(key: string): T {
    const item = this.storage.getItem(key) as T;
    return item;
  }
}
