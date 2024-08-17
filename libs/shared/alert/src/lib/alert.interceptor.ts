import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

const ALERT_SUCCESS_RESPONSE = [
  'CreateSuccessResponse'
];

export const alertErrorInterceptor: (req: HttpRequest<unknown>, next: HttpHandlerFn) => Observable<HttpEvent<any>>
  = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const alertCtrl = inject(AlertController);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.message ?? 'An Unknown error occurred';
      const presentAlert = async () => {
        const alert = await alertCtrl.create({
          cssClass: 'alert-error',
          header: 'Error',
          message,
          buttons: ['Close']
        });

        await alert.present();
      };
      presentAlert().then();

      return throwError(() => err);

    }),
    tap(async (res) => {

      const alertInfo = {
        header: null as null | string,
        message: null as null | string,
        cssClass: null as null | 'alert-error' | 'alert-success'
      };
      if (res instanceof HttpResponse && res.body?.errors) {
        const originalError = res.body.errors[0]?.extensions?.originalError?.message;

        if (Array.isArray(originalError)) {
          alertInfo.message = originalError.join(', ');
          alertInfo.cssClass = 'alert-error';
          alertInfo.header = res.body.errors[0]?.message ?? 'An Unknown error occurred';
        } else {
          alertInfo.message = res.body.errors[0]?.message ?? 'An Unknown error occurred';
          alertInfo.cssClass = 'alert-error';
          alertInfo.header = 'Error';
        }
      }

      if (res instanceof HttpResponse && res.body?.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = Object.values((res?.body?.data))[0];
        if (ALERT_SUCCESS_RESPONSE.includes(response?.['__typename'])) {
          alertInfo.message = response.message;
          alertInfo.cssClass = 'alert-success';
          alertInfo.header = 'Success';
        }
        if (response?.message && response?.success) {
          alertInfo.message = response.message;
          alertInfo.cssClass = 'alert-success';
          alertInfo.header = 'Success';
        }
      }

      if (alertInfo.message) {
        const presentAlert = async () => {
          const alert = await alertCtrl.create({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...alertInfo as any,
            buttons: ['OK']
          });

          await alert.present();
        };
        await presentAlert();
      }
    })
  );
};
