import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';

import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput, IonItem,
  IonLabel, IonList, IonNav,
  IonRow,
  IonText
} from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'studiz-website-complete-get-started',
  standalone: true,
  imports: [
    IonContent,
    IonFooter,
    IonRow,
    IonButton,
    JsonPipe,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonText
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  currentInstitutionRequest = inject(InstitutionalRequestStore).currentInstitutionRequest;
  ionNav = input.required<IonNav>()

  createInstitution() {
    console.log({ Res: 'creating...' })
  }
}
