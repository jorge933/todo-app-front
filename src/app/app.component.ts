import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { USER_INFOS } from './constants/user-infos';
import { User, UserInfos } from './interfaces/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  user: User;

  constructor(@Inject(USER_INFOS) private readonly userInfos: UserInfos) {
    this.user = this.userInfos.user as User;
  }
}
