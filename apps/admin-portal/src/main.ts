import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { setAssetPath } from '@stencil/core'

import '@angular/localize/init';

setAssetPath(`${window.location.origin}/svg`);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
