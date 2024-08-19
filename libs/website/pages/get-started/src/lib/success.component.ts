import { Component, input, viewChild } from '@angular/core';
import { IonButton, IonCol, IonNav, IonRouterLink, IonRow, IonText } from '@ionic/angular/standalone';
import { GetStartedComponent } from './get-started.component';
import { RouterLink } from '@angular/router';
import { DoneIllustration } from '@studiz/icons';

@Component({
  standalone: true,
  imports: [
    IonNav,
    RouterLink,
    IonButton,
    IonRow,
    IonCol,
    IonText,
    DoneIllustration
  ],
  template: `
    <ion-row class="ion-justify-content-center ion-wrap">
      <ion-col sizeXl="4" sizeLg="5" sizeMd="6" sizeXs="10" class="ion-padding">
        <studiz-done-illustration></studiz-done-illustration>
      </ion-col>
      <ion-col sizeXl="4" sizeLg="5" sizeMd="6" sizeXs="12" class="ion-padding">
        <ion-row style="height: 100%; align-content: center" class="ion-align-items-center">
          <ion-col size="12">
            <ion-text color="success">
              {{ successMessage() }}
            </ion-text>
          </ion-col>
          <ion-col size="12">
            <ion-button [routerLink]="doneRoutesTo()">
              <span class="ion-padding-horizontal">Done</span>
            </ion-button>
          </ion-col>

        </ion-row>

      </ion-col>
    </ion-row>
  `
})
export class SuccessComponent {
  successMessage = input('The operation was successful!');
  doneRoutesTo = input(['']);
}
