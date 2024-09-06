import { ApolloLink } from '@apollo/client/core';
import { SHOW_LOADER } from '@studiz/frontend/constants';
import { LoadingController } from '@ionic/angular/standalone';

export const
  contextLoader = (loadingCtrl: LoadingController) => new ApolloLink((operation, forward) => {
    const showLoader = operation.getContext()[SHOW_LOADER];
    if(showLoader) {
      const loader = loadingCtrl.create({ spinner: 'bubbles' })
        .then(async (loaded) => {
          await loaded.present();
          return loaded
        });
      return forward(operation).map((response) => {
        loader.then(x => x.dismiss());
        return response;
      });
    }
    return forward(operation)

  });
