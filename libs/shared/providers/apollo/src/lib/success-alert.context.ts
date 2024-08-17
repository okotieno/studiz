import { ApolloLink } from '@apollo/client/core';
import { SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';
import { ToastController } from '@ionic/angular/standalone';

export const
  contextSuccessAlert = (alertCtrl: ToastController) => new ApolloLink((operation, forward) => {
  const showSuccessMessage = operation.getContext()[SHOW_SUCCESS_MESSAGE];
  return forward(operation).map((response) => {
    const res: Record<string, string> = Object.values(response.data ?? {})[0];
    if (showSuccessMessage && res?.['message']) {
      const presentAlert = async () => {
        const alert = await alertCtrl.create({
          duration: 5000,
          cssClass: 'toast-success',
          header: 'Success',
          message: res['message'],
          buttons: ['OK']
        });

        await alert.present();
      };
      presentAlert().then();
    }
    return response;
  });
});
