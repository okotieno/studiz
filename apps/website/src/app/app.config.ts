import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { AnimationController, provideIonicAngular } from '@ionic/angular/standalone';
import { Animation } from '@ionic/angular/standalone';

import 'swiper/css';
import { routingAnimation } from '@studiz/animations';

export const appConfig: ApplicationConfig = {
  providers: [

    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideIonicAngular({ navAnimation: routingAnimation }),
  ],
};
