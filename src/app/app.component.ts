import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EncryptStorageService } from './services/encrypt-storage/encrypt-storage.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  user: User;

  constructor(private encryptStorage: EncryptStorageService) {}

  ngOnInit(): void {
    const userInStorage = this.encryptStorage.getItem('user');

    if (userInStorage) this.user = userInStorage;
  }
}
