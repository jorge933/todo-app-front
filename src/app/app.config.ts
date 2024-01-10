import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { EncryptStorageService } from './services/utils/encrypt-storage.service';
import { requestErrorInterceptor } from './interceptors/request-error/request-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([requestErrorInterceptor])),
    EncryptStorageService,
  ],
};
