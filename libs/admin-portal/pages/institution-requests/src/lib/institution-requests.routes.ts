import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { inject } from '@angular/core';
import { InstitutionRequestFrontendService } from '@studiz/frontend/institution-request-frontend-service';
import {
  FormExitGuardService,
  IHasUnsavedChanges,
} from '@studiz/frontend/form-exit-guard';

const institutionRequestResolver = (route: ActivatedRouteSnapshot) =>
  inject(InstitutionRequestFrontendService).getItemWithId(
    Number(route.params['institutionRequestId'])
  );

export const ADMIN_INSTITUTION_REQUEST_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./institution-requests.component').then(
        (m) => m.InstitutionRequestsComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import(
        './manage-institution-request/manage-institution-request.component'
      ).then((m) => m.ManageInstitutionRequestComponent),
    canDeactivate: [
      (component: IHasUnsavedChanges) =>
        inject(FormExitGuardService).hasUnsavedChanges(component),
    ],
  },
  {
    path: ':institutionRequestId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './view-institution-request/view-institution-request.component'
          ).then((m) => m.ViewInstitutionRequestComponent),
        resolve: {
          institutionRequest: institutionRequestResolver,
        },
      },
      {
        path: 'edit',
        loadComponent: () =>
          import(
            './manage-institution-request/manage-institution-request.component'
          ).then((m) => m.ManageInstitutionRequestComponent),
        canDeactivate: [
          (component: IHasUnsavedChanges) =>
            inject(FormExitGuardService).hasUnsavedChanges(component),
        ],
        resolve: {
          institutionRequest: institutionRequestResolver,
        },
      },
    ],
  },
];
