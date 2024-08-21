import { Component, input } from '@angular/core';
import { IonBackButton, IonButton, IonCol, IonNav, IonRow, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { NotFoundIllustration } from '@studiz/icons';

@Component({
  selector: 'studiz-not-found-page',
  standalone: true,
  imports: [
    IonNav,
    RouterLink,
    IonButton,
    IonRow,
    IonCol,
    IonText,
    NotFoundIllustration,
    IonBackButton
  ],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent {
  successMessage = input('The resource was not found.!');
}
