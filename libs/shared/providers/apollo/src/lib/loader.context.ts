import { ApolloLink } from '@apollo/client/core';
import { SHOW_LOADER, LOADER_ID } from '@studiz/frontend/constants';
import { LoadingController } from '@ionic/angular/standalone';
import { LoaderStore } from '@studiz/loader';

export const
  contextLoader = (loaderStore: any) => new ApolloLink((operation, forward) => {
    const showLoader = operation.getContext()[SHOW_LOADER];
    if (showLoader) {
      loaderStore.startLoader(operation.getContext()[LOADER_ID])
      // const loader = loadingCtrl.create({ spinner: 'bubbles' })
      //   .then(async (loaded) => {
      //     await loaded.present();
      //     return loaded;
      //   });

      return forward(operation).map((response) => {
        // loader.then(x => x.dismiss());
        loaderStore.stopLoader(operation.getContext()[LOADER_ID])
        return response;
      });
    }
    return forward(operation)

  });
