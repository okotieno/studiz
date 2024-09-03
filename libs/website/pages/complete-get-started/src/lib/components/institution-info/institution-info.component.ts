import { Component, effect, inject, input } from '@angular/core';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';

import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonLabel,
  IonNav,
  IonRow,
  IonText
} from '@ionic/angular/standalone';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FileUploadComponent } from '@studiz/file-upload';


@Component({
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonInput,
    IonLabel,
    IonButton,
    JsonPipe,
    ReactiveFormsModule,
    IonIcon,
    IonText,
    IonFooter,
    IonContent,
    FileUploadComponent
  ],
  templateUrl: './institution-info.component.html',
  styleUrl: './institution-info.component.scss'
})
export class InstitutionInfoComponent {
  ionNav = input.required<IonNav>();
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    logoUrl: ['', Validators.required]
  });
  institutionalRequestStore = inject(InstitutionalRequestStore);

  institutionInfoEffect = effect(() => {
    const progressData = this.institutionalRequestStore.institutionInfo();
    console.log(progressData)

  });

  saveInfo() {
    // this.institutionalRequestStore.saveInstitutionalInfo(this.form.value).subscribe({
    //   next: async () => {
    //     await this.ionNav().push(SummaryComponent, {
    //       ionNav: this.ionNav()
    //     }, {});
    //     this.institutionalRequestStore.updateCurrentStep('summary');
    //   }
    // });
  }
}
