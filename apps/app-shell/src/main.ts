import { setRemoteDefinitions } from '@nx/angular/mf';

import '@angular/localize/init';
import { setAssetPath } from '@stencil/core';

setAssetPath(`${window.location.origin}/svg`);

fetch('/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
