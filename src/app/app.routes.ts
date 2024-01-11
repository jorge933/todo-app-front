import { Routes } from '@angular/router';
import { authRoutes } from './domain/auth/auth.routes';
import { tasksRoutes } from './domain/tasks/tasks.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    //aojmaá
    path: 'tasks',
    children: tasksRoutes,
  },
];
