import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from '@studiz/apollo-provider';
import { routingAnimation } from '@studiz/animations';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { APP_ENVIRONMENT } from '@studiz/frontend/constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideIonicAngular({
      navAnimation: routingAnimation
    }),
    ...provideApollo(),
    provideHttpClient(),
    {
      provide: APP_ENVIRONMENT,
      useValue: process.env
    }
  ],
};
