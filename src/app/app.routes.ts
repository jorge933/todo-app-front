import { Routes } from '@angular/router';
import { authRoutes } from './domain/auth/auth.routes';
import { LoginPage } from './domain/auth/pages/login/login.page';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
];
