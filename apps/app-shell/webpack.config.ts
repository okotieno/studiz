import { composePlugins } from '@nx/webpack';
import { withModuleFederation } from '@nx/angular/module-federation';
import moduleFederationConfig from './module-federation.config';

import { DefinePlugin } from 'webpack';

module.exports = composePlugins(
  withModuleFederation(moduleFederationConfig),
  config => {
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(new DefinePlugin(getProcessEnv()));
    return config;
  }
);

function getProcessEnv() {
  return {
    'process.env': JSON.stringify(Object.fromEntries(
      Object.entries(process.env).filter(([key]) => key.startsWith('STUDIZ'))
    ))
  };
}

