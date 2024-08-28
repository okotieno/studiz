import { Component, inject, input } from '@angular/core';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
  IonList,
  IonNav,
  IonRow,
  IonText
} from '@ionic/angular/standalone';
import { JsonPipe } from '@angular/common';
import { SuccessPageComponent } from '@studiz/frontend/success-page';


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
  institutionalRequestStore = inject(InstitutionalRequestStore);
  currentInstitutionRequest = this.institutionalRequestStore.currentInstitutionRequest;
  ionNav = input.required<IonNav>();

  createInstitution() {
    this.institutionalRequestStore.completeInstitutionRegistration().subscribe({
      next: async (res) => {
        this.institutionalRequestStore.updateCurrentStep('success');
        await this.ionNav().push(SuccessPageComponent, {
          successMessage: res.data?.completeRequestRegistration?.message
        });
      }
    });
  }
}
