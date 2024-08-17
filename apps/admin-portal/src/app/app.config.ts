import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { ApolloModule } from 'apollo-angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideApollo } from '@studiz/apollo-provider';
import { addAccessTokenInterceptor, provideSocialLogin } from '@studiz/frontend/auth';
import { APP_NAME, BACKEND_URL, GOOGLE_CLIENT_ID, MAP_TILER_KEY } from '@studiz/frontend/constants';
import { alertErrorInterceptor } from '@studiz/frontend/alert';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withHashLocation()),
    provideAnimations(),
    importProvidersFrom([
      SocialLoginModule,
      ApolloModule
    ]),
    provideIonicAngular({  }),
    // provideIonicAngular({ navAnimation: customAnimation }),
    provideHttpClient(
      withInterceptors([
        alertErrorInterceptor,
        addAccessTokenInterceptor
      ])
    ),
    provideApollo(),
    provideSocialLogin(),
    {
      provide: APP_NAME,
      useValue: 'Furaha Admin Portal'
    },
    {
      provide: MAP_TILER_KEY,
      useValue: process.env['STUDIZ_MAP_TILER_KEY']
    },
    {
      provide: GOOGLE_CLIENT_ID,
      useValue: String(process.env['STUDIZ_GOOGLE_CLIENT_ID'])
    },
    {
      provide: BACKEND_URL,
      useValue: process.env['STUDIZ_BACKEND_URL']
    }
  ],
};
