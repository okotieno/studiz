import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular/standalone';

import 'swiper/css';

export const appConfig: ApplicationConfig = {
  providers: [

    // provideClientHydration(), TODO enable when SSR with ionic is fixed
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideIonicAngular(),
  ],
};
