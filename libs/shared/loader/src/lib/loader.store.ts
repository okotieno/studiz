import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';

interface LoaderState {
  loaderIds: string[];
  loader?: HTMLIonLoadingElement;
}

const initialState: LoaderState = {
  loaderIds: [],
  loader: undefined,
};

export const LoaderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const loaderRequestCount = computed(() => {
      const loaderIds = store.loaderIds();
      return loaderIds.length;
    });
    const loaderStarted = computed(() => {
      return loaderRequestCount() > 0;
    });

    return { loaderRequestCount, loaderStarted };
  }),
  withMethods((store) => {
    const loadingCtrl = inject(LoadingController);
    const generateLoaderId = () => (Math.random() + 1).toString(36).substring(2);
    const startLoader = async (loaderId?: string) => {
      if (!store.loaderStarted()) {
        const loader = await loadingCtrl.create({ spinner: 'bubbles' });
        patchState(store, { loader });
        await loader.present();
      }
      if (!loaderId) {
        loaderId = generateLoaderId();
      }
      const loaderIds = [...store.loaderIds()];
      loaderIds.push(loaderId);
      patchState(store, { loaderIds });
    };

    const stopLoader = async (loaderId: string) => {
      setTimeout(async () => {
        let loaderIds = [...store.loaderIds()];
        loaderIds = loaderIds.filter(item => item !== loaderId)
        patchState(store, { loaderIds });
        if(loaderIds.length < 1) {
          await store.loader?.()?.dismiss();
        }
      }, 300)
    };
    return { generateLoaderId, startLoader, stopLoader };
  }),
  withHooks((store) => {
    const loadingCtrl = inject(LoadingController);
    return ({
      onInit: async () => {
        const loader = await loadingCtrl.create({ spinner: 'bubbles' });
        patchState(store, { loader });
      }
    });
  }));
