import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { EncryptStorageService } from './services/utils/encrypt-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
     provideRouter(routes),
     provideAnimations(), 
    EncryptStorageService,
    ],
};
