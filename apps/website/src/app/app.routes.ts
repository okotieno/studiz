import { ActivatedRouteSnapshot, Route, UrlSegment } from '@angular/router';
import { InstitutionRequestFrontendService } from '@studiz/frontend/institution-request-frontend-service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { IQueryOperatorEnum } from '@studiz/shared/types/frontend';

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
          institutionRequest: (route: ActivatedRouteSnapshot) => {
            return inject(InstitutionRequestFrontendService)
              .getItems({
                pageSize: 1,
                filters: [
                  {
                    field: "slug",
                    operator: IQueryOperatorEnum.Equals,
                    value: route.params['id'],
                    values: []
                  }
                ]
              })
              .pipe(
                map(res => res.items?.[0])
              )
          }

        }
      },
      {
        path: '**',
        loadComponent: () => import('@studiz/frontend/not-found-page'),
      }
    ]
  }

];
