import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { routes } from './app.routes';
import { addTokenInRequestInterceptor } from './interceptors/add-token-in-request/add-token-in-request.interceptor';
import { requestErrorInterceptor } from './interceptors/request-error/request-error.interceptor';
import { StorageService } from './services/storage/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([requestErrorInterceptor, addTokenInRequestInterceptor])
    ),
    StorageService,
    provideHotToastConfig(),
  ],
};
