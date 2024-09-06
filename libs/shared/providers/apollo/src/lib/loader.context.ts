import { ApolloLink } from '@apollo/client/core';
import { SHOW_LOADER } from '@studiz/frontend/constants';
import { LoadingController } from '@ionic/angular/standalone';

export const
  contextLoader = (loadingCtrl: LoadingController) => new ApolloLink((operation, forward) => {
    const loader = loadingCtrl.create({ spinner: 'bubbles' })
      .then((loaded) => {
        loaded.present();
        return loaded
      });
    console.log('show loader');
    const showSuccessMessage = operation.getContext()[SHOW_LOADER];
    return forward(operation).map((response) => {
      loader.then(x => x.dismiss());
      console.log('dismiss loader');
      return response;
    });
  });
