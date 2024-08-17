import { Route } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@studiz/frontend/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    canMatch: [() => inject(AuthService).userLoaded()],
    children: [
      {
        path: '',
        canMatch: [
          () => !inject(AuthService).loggedIn()
        ],
        children: [
          {
            path: '',
          //   title: `${$localize`:@@loco\:66597fba454e148b450c51b4:Furaha Admin Portal`} | ${$localize`:@@loco\:6659802094747a6b220fd162:Login`}`,
            loadComponent: () => import('@studiz/frontend/login-page')
          }
        ]
      },
      {
        path: '',
        canMatch: [() => inject(AuthService).loggedIn()],
        // loadComponent: () => import('@studiz/shared/layout'),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
          },
          // {
          //   path: 'home',
          //   title: `${$localize`:@@loco\:66597fba454e148b450c51b4:Furaha Admin Portal`} | ${$localize`:@@loco\:665aacc06ea4c57b570534c2:Home`}`,
          //   loadComponent: () => import('@furaha/admin-portal/home-page')
          // },

        ]
      }
    ]
  }
];
