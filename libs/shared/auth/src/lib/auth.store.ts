import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IAccessToken, IUserModel } from '@studiz/shared/types/frontend';
import { computed, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginWithTokenGQL } from './schemas/auth.generated';
import { map } from 'rxjs';

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
    const router = inject(Router);
    const loginWithTokenGQL = inject(ILoginWithTokenGQL);
    const updateAccessToken = (accessToken: string) => {
      patchState(store, { accessToken });
    };

    const authenticateByAccessToken = async (accessToken?: string) => {
      if (!accessToken) {
        await router.navigate(['login']);
        return false;
      }

      return loginWithTokenGQL.mutate({ token: accessToken }).pipe(
        map(() => {
          console.log('works')
          return true;
        })
      )

    };

    return { updateAccessToken, authenticateByAccessToken };
  })
);
