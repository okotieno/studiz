import {
  ActivatedRouteSnapshot,
  Route
} from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { inject } from '@angular/core';
import { AuthStore } from '@studiz/frontend/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: {
      auth: (route: ActivatedRouteSnapshot) => inject(AuthStore).authenticate({ accessToken: route.queryParams['accessToken'] })
    },
    children: [
      {
        path: '',
        canMatch: [
          () => inject(AuthStore).isAuthenticated()
        ],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('@studiz/shell-home-page'),
            canMatch: [
              () => inject(AuthStore).isAuthenticated()
            ]
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
          () => !inject(AuthStore).isAuthenticated()
        ],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login',
          },
          {
            path: 'login',
            loadComponent: () => import('@studiz/shell-login-page'),
            canMatch: [
              () => !inject(AuthStore).isAuthenticated()
            ]
          }
        ]
      }
    ]
  }
];
