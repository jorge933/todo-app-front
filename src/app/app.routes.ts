import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./domain/auth/auth.module').then((module) => module.AuthModule),
  },
];
