import { Routes } from '@angular/router';
import { authRoutes } from './domain/auth/auth.routes';
import { tasksRoutes } from './domain/tasks/tasks.routes';
import { authGuard } from './guards/auth.guard';
import { authRoutesGuard } from './guards/auth-routes.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: authRoutes,
    canActivate: [authRoutesGuard],
  },
  {
    path: 'tasks',
    children: tasksRoutes,
    canActivate: [authGuard],
  },
];
