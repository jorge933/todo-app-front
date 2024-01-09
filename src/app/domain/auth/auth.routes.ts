import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.page').then((page) => page.SignupPage),
  },
];
