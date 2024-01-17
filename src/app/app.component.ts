import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { getUserInfos } from './functions/user-infos';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  user = getUserInfos()?.user;

  constructor(router: Router, environmentInjector: EnvironmentInjector) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd && !this.user))
      .subscribe((event) => {
        const { url } = event as NavigationEnd;
        const isAuthRoute = url.startsWith('/auth');

        if (!isAuthRoute) {
          runInInjectionContext(environmentInjector, () => {
            const { user } = getUserInfos();
            this.user = user;
          });
        }
      });
  }
}
