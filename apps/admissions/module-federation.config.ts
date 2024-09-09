import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'admissions',
  exposes: {
    './Routes': 'apps/admissions/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
