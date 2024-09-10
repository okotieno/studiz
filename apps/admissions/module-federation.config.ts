import { ModuleFederationConfig, SharedFunction } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'admissions',
  exposes: {
    './Routes': 'apps/admissions/src/app/remote-entry/entry.routes.ts',
  },
  shared: (pkg: string, sharedConfig) => {
    // Don't share this package; each app can load its own version.
    // if (pkg === '@angular/core') return false;

    console.log({ pkg, sharedConfig });



    return sharedConfig;
  }
};
export default config;
