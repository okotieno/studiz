import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {
  IonAccordion,
  IonAccordionGroup, IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonRow
} from '@ionic/angular/standalone';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { IInstitutionRequestModel } from '@studiz/shared/types/frontend';

@Component({
  selector: 'studiz-website-complete-get-started',
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonInput,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonLabel,
    IonButton,
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './complete-get-started.component.html',
  styleUrl: './complete-get-started.component.css',
})
export class CompleteGetStartedComponent {
  progressData = inject(ActivatedRoute).snapshot.data['institutionRequest'] as IInstitutionRequestModel;
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    systemAdminInfo: this.fb.nonNullable.group({
      email: [this.progressData.adminEmail, [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],

    }),
  })

  get systemAdminInfoControl() {
    return this.form.get('systemAdminInfo');
  }
  constructor() {
    console.log('CompleteGetStartedComponent', this.progressData);
  }
}
