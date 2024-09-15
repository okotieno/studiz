import { Component, inject, input } from '@angular/core';
import { IonButton, IonCol, IonNav, IonRow, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { DoneIllustration } from '@studiz/icons';

@Component({
  selector: 'studiz-success-page',
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
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
  router = inject(Router);
  ionNav = inject(IonNav);
  successMessage = input('The operation was successful!');
  doneRoutesTo = input(['']);

  async routeToOnDone() {
    await this.ionNav.popToRoot();
    await this.router.navigate(this.doneRoutesTo());
  }
}
