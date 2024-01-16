import { Inject, Injectable, Optional } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
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

  getMultipleItems<T>(keys: Array<keyof T>) {
    const isInstanceOfEncryptStorage = this.storage instanceof EncryptStorage;

    if (!isInstanceOfEncryptStorage) {
      const items: { [Key in keyof T]?: T[Key] } = {};

      keys.forEach((key) => {
        const item = this.storage.getItem(key as string);
        items[key] = item;
      });

      return items;
    }

    const items: { [Key in keyof T]?: T[Key] } =
      this.storage.getMultipleItems(keys);
    return items;
  }
}
