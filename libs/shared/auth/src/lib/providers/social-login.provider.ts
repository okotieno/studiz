import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { inject } from '@angular/core';
import { GOOGLE_CLIENT_ID } from '@studiz/frontend/constants';

export const provideSocialLogin = ()  => ({
  provide: 'SocialAuthServiceConfig',
  useFactory: () => {
    const googleClientId = inject(GOOGLE_CLIENT_ID);
    return ({
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(googleClientId)
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig);
  }
})
