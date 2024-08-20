import { ApolloLink } from '@apollo/client/core';
import { SHOW_ERROR_MESSAGE } from '@studiz/frontend/constants';
import { AlertController } from '@ionic/angular/standalone';

export const
  contextErrorAlert = (alertCtrl: AlertController) => new ApolloLink((operation, forward) => {
  const showErrorMessage = operation.getContext()[SHOW_ERROR_MESSAGE];
  return forward(operation).map((response) => {
    const error = response.errors?.[0];
    const errorMessage = error?.message;
    const originalError = error?.extensions?.['originalError'] as { message: string[], error: string }
    const originalErrorError = originalError?.error
    const message = [originalError?.['message']].join(', ');

    if (showErrorMessage && errorMessage) {
      const presentAlert = async () => {
        const alert = await alertCtrl.create({
          cssClass: 'alert-error',
          header: originalErrorError ?? errorMessage,
          message,
          buttons: ['OK']
        });

        await alert.present();
      };
      presentAlert().then();
    }
    return response;
  });
});
