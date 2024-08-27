import { ActivatedRouteSnapshot, Route, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import {
  InstitutionalRequestStore
} from '../../../../libs/website/pages/complete-get-started/src/lib/store/institutional-request.store';

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
        loadComponent: () => import('@studiz-pro/website-complete-get-started'),
        canMatch: [
          (_: ActivatedRouteSnapshot, urlSegments: UrlSegment[]) => {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9a-f]{12}$/i;
            return uuidRegex.test(urlSegments[1].path);
          }
        ],
        resolve: {
          institutionRequest: (route: ActivatedRouteSnapshot) =>
            inject(InstitutionalRequestStore).getInstitutionRequestBySlug(route.params['id'])
        }
      },
      {
        path: '**',
        loadComponent: () => import('@studiz/frontend/not-found-page')
      }
    ]
  }

];
