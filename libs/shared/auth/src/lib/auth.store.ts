import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IAccessToken, IUserModel } from '@studiz/shared/types/frontend';
import { computed, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginWithTokenGQL } from './schemas/auth.generated';
import { catchError, map, of } from 'rxjs';
import { SHOW_ERROR_MESSAGE, SHOW_LOADER } from '@studiz/frontend/constants';

export interface AuthStateInterface {
  user?: IUserModel,
  accessToken?: IAccessToken['accessToken'],
}

const initialState: AuthStateInterface = {};
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {

    const isAuthenticated: Signal<boolean> = computed(() => !!store?.user?.()?.id);

    return { isAuthenticated };
  }),
  withMethods((store) => {
    const loginWithTokenGQL = inject(ILoginWithTokenGQL);
    const updateAccessToken = (accessToken: string) => {
      patchState(store, { accessToken });
    };

    const authenticate = ({ accessToken }: {accessToken?: string}) => {
      if(store.user) {
        return store.user
      }
      if (accessToken) {
        return authenticateByAccessToken(accessToken);
      }
      return;
    }

    const authenticateByAccessToken = (accessToken: string) => {
      return loginWithTokenGQL.mutate({ token: accessToken }, {
        context: { [SHOW_LOADER]: true, [SHOW_ERROR_MESSAGE]: true }
      }).pipe(
        map(() => {
          return true;
        }),
        catchError(() => of(false))
      );

    };

    return { authenticate, updateAccessToken, authenticateByAccessToken };
  })
);
