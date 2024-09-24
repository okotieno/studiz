import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { inject } from '@angular/core';
import { AuthStore } from '@studiz/frontend/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    canMatch: [
      () => {
        console.log('PATH Match', inject(AuthStore).isAuthenticated())
        return inject(AuthStore).isAuthenticated()
      }
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('@studiz/shell-home-page'),
      },
      {
        path: 'admissions',
        loadChildren: () =>
          loadRemoteModule('admissions', './Routes').then((m) => m.remoteRoutes)
      }
    ]
  },
  {
    path: '',
    canMatch: [
      () => {
        console.log('PATH Match', inject(AuthStore).isAuthenticated())
        return !inject(AuthStore).isAuthenticated()
      }
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () => import('@studiz/shell-login-page')
      }
    ]
  }
];
