import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IAccessToken, ILoginResponse, IUserModel } from '@studiz/shared/types/frontend';
import { computed, inject, signal, Signal } from '@angular/core';
import { ILoginWithTokenGQL, IRequestLoginLinkGQL } from './schemas/auth.generated';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { LOADER_ID, SHOW_ERROR_MESSAGE, SHOW_LOADER, SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';
import { LoaderStore } from '@studiz/loader';

export interface AuthStateInterface {
  user: IUserModel | undefined,
  accessToken?: IAccessToken['accessToken'],
}

const initialState: AuthStateInterface = { user: undefined };

// loginDetails = signal<ILoginResponse>({ accessToken: '', refreshToken: '', refreshTokenKey: '' });
// user = computed(() => this.loginDetails().user);
// accessToken = computed(() => this.loginDetails().accessToken);
// refreshToken = computed(() => this.loginDetails().refreshToken);

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const isAuthenticated = computed(() => {
      const user = store.user();
      return !!user?.id;
    });
    return { isAuthenticated };
  }),
  withMethods((store) => {
    const loginWithTokenGQL = inject(ILoginWithTokenGQL);
    const requestLoginLinkGQL = inject(IRequestLoginLinkGQL);
    const loaderStore = inject(LoaderStore);
    const updateAccessToken = (accessToken: string) => {
      patchState(store, { accessToken });
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
          patchState(store, { user: { ...res.data?.loginWithToken?.user } });
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
