import { Component, effect, inject, input } from '@angular/core';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';

import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput, IonItem,
  IonLabel,
  IonNav,
  IonRow,
  IonText
} from '@ionic/angular/standalone';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { FileUploadComponent } from '@studiz/file-upload';
import { AdminInfoComponent } from '../admins-info/admin-info.component';


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
    FileUploadComponent,
    IonItem
  ],
  templateUrl: './institution-info.component.html',
  styleUrl: './institution-info.component.scss'
})
export class InstitutionInfoComponent {
  ionNav = input.required<IonNav>();
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    // logoFileUpload: [null as null | [{ id: number }], Validators.required]
    logoFileUpload: [[] as { id: number }[], [Validators.required]]
  });
  institutionalRequestStore = inject(InstitutionalRequestStore);

  institutionInfoEffect = effect(() => {
    const progressData = this.institutionalRequestStore.institutionInfo();
    console.log(progressData);
    this.form.get('name')?.setValue(progressData?.name ?? '');
    this.form.get('logoFileUpload')?.setValue(progressData?.logoFileUpload ? [{ id: progressData?.logoFileUpload.id }] : []);

  });

  saveInfo() {
    console.log(this.form.value)
    this.institutionalRequestStore.saveProgressData({ institutionInfo: {
      name: this.form.value.name ?? '',
      logoFileUpload: {
        id: this.form.value.logoFileUpload?.[0]?.id as number
      }
      }}).subscribe({
      next: async () => {
        await this.ionNav().push(AdminInfoComponent, {
          ionNav: this.ionNav()
        }, {});
        this.institutionalRequestStore.updateCurrentStep('systemAdminInfo');
      }
    });
  }
}
