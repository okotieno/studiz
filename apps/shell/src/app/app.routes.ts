import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  defaultUrlMatcher,
  Route,
  Router,
  UrlSegment,
  UrlSegmentGroup
} from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { inject } from '@angular/core';
import { AuthStore } from '@studiz/frontend/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@studiz/shell-home-page'),
    canMatch: [
      () => !inject(AuthStore).isAuthenticated()
    ],
    canActivate: [
      async (route: ActivatedRouteSnapshot) => await inject(AuthStore).authenticateByAccessToken(route.queryParams['accessToken'])
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('@studiz/shell-login-page'),
  },
  {
    path: 'admissions',
    loadChildren: () =>
      loadRemoteModule('admissions', './Routes').then((m) => m.remoteRoutes)
  }
];
