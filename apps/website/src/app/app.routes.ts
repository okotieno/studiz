import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@studiz/website-layout'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@studiz/website-home-page')
      },
      {
        path: 'get-started',
        loadComponent: () => import('@studiz/website-get-started-page')
      },
      {
        path: 'get-started/:id',
        loadComponent: () => import('@studiz-pro/website-complete-get-started')
      }
    ]
  }

];
