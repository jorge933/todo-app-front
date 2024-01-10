import { Routes } from '@angular/router';
import { authRoutes } from './domain/auth/auth.routes';
import { tasksRoutes } from './domain/tasks/tasks.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'tasks',
    children: tasksRoutes,
  },
];
