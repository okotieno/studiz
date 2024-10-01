import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ILoginResponse } from '@studiz/shared/types/frontend';
import { computed, inject } from '@angular/core';
import { ILoginWithTokenGQL, IRequestLoginLinkGQL } from './schemas/auth.generated';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { LOADER_ID, SHOW_ERROR_MESSAGE, SHOW_LOADER, SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';
import { LoaderStore } from '@studiz/loader';

export interface AuthStateInterface {
  loginDetails: ILoginResponse,
}

const initialState: AuthStateInterface = {
  loginDetails :{ accessToken: '', refreshToken: '', refreshTokenKey: '' }
};

// loginDetails = signal<ILoginResponse>({ accessToken: '', refreshToken: '', refreshTokenKey: '' });
// user = computed(() => this.loginDetails().user);
// accessToken = computed(() => this.loginDetails().accessToken);
// refreshToken = computed(() => this.loginDetails().refreshToken);

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const user = computed(() => store.loginDetails().user)
    const isAuthenticated = computed(() => {
      return !!user()?.id;
    });
    return { user, isAuthenticated };
  }),
  withMethods((store) => {
    const loginWithTokenGQL = inject(ILoginWithTokenGQL);
    const requestLoginLinkGQL = inject(IRequestLoginLinkGQL);
    const loaderStore = inject(LoaderStore);
    const updateAccessToken = (accessToken: string) => {
      const loginDetails = { ...store.loginDetails() };
      loginDetails.accessToken = accessToken;
      patchState(store, { loginDetails });
    };


    const authenticate = ({ accessToken }: { accessToken?: string }) => {
      if (store.user()?.id) return of(!!store.user());

      if (accessToken) return authenticateByAccessToken(accessToken);

      return of(false);
    };

    const authenticateByAccessToken = (accessToken: string) => {
      return loginWithTokenGQL.mutate({ token: accessToken }, {
        context: { [SHOW_LOADER]: true, [SHOW_ERROR_MESSAGE]: true }
      }).pipe(
        tap((res) => {
          patchState(store, { loginDetails: { ...res.data?.loginWithToken as ILoginResponse  } });
        }),
        map(() => {
          return true;
        }),
        catchError(() => of(false))
      );

    };

    const requestLoginLink = (email: string) => {
      const loaderId = loaderStore.generateLoaderId();
      return requestLoginLinkGQL.mutate(
        { email },
        {
          context: {
            [SHOW_LOADER]: true,
            [LOADER_ID]: loaderId,
            [SHOW_ERROR_MESSAGE]: true,
            [SHOW_SUCCESS_MESSAGE]: true
          }
        }
      ).pipe(
        catchError((err) => {
          loaderStore.stopLoader(loaderId);
          return throwError(() => new Error(err))
        })
      )
    };

    return { authenticate, updateAccessToken, authenticateByAccessToken, requestLoginLink };
  })
);
