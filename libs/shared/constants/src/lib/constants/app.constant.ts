import { InjectionToken } from '@angular/core';

export const BACKEND_URL = new InjectionToken<string>('backend-url');
export const APP_ENVIRONMENT = new InjectionToken<string>('app-environment');
export const APP_NAME = new InjectionToken<string>('app-name');
export const GOOGLE_CLIENT_ID = new InjectionToken<string>('google-client-id');
export const MAP_TILER_KEY = new InjectionToken<string>('map-tiler-key');
export const SHOW_SUCCESS_MESSAGE = 'show-success-message';
export const SHOW_LOADER = 'show-loader';
export const SHOW_ERROR_MESSAGE = 'show-error-message';

