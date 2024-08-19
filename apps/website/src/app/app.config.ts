import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';

import 'swiper/css';
import { routingAnimation } from '@studiz/animations';
import { provideApollo } from '@studiz/apollo-provider';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideIonicAngular({ navAnimation: routingAnimation }),
    provideHttpClient(),
    ...provideApollo(),
  ],
};
