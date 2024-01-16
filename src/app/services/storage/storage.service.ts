import { Inject, Injectable, Optional } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | EncryptStorage;
  private isInstanceOfEncryptStorage: boolean;

  constructor(@Optional() @Inject('storage') storage: Storage) {
    if (storage) {
      this.storage = storage;
    } else {
      const encryptStorage = new EncryptStorage(environment.SECRET_KEY, {
        storageType: 'sessionStorage',
      });

      this.storage = encryptStorage;
    }

    this.isInstanceOfEncryptStorage = this.storage instanceof EncryptStorage;
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem<T>(key: string): T {
    const item = this.storage.getItem(key) as T;
    return item;
  }

  getMultipleItems<T>(keys: Array<keyof T>) {
    if (!this.isInstanceOfEncryptStorage) {
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

  setMultipleItems(values: { [key: string]: string }) {
    if (!this.isInstanceOfEncryptStorage) {
      const keys = Object.entries(values);

      keys.forEach(([key, value]) => {
        this.storage.setItem(key, value);
      });

      return;
    }

    const valuesInArray = Object.entries(values);
    this.storage.setMultipleItems(valuesInArray);
  }
}
