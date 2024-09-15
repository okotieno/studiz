import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from '@studiz/apollo-provider';
import { routingAnimation } from '@studiz/animations';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { APP_ENVIRONMENT } from '@studiz/frontend/constants';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideIonicAngular({
      navAnimation: routingAnimation,
      useSetInputAPI: true
    }),
    ...provideApollo(),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: APP_ENVIRONMENT,
      useValue: process.env
    }
  ],
};
