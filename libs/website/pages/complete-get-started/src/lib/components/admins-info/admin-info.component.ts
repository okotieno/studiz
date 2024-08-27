import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';

import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonLabel, IonNav,
  IonRow,
  IonText
} from '@ionic/angular/standalone';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { SummaryComponent } from '../summary/summary.component';


@Component({
  selector: 'studiz-website-complete-get-started',
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
    IonContent
  ],
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.scss'
})
export class AdminInfoComponent {
  ionNav = input.required<IonNav>()
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    adminInfos: this.fb.nonNullable.array([
      this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      })
    ])
  });
  institutionalRequestStore = inject(InstitutionalRequestStore);
  institutionalRequestProgressDataEffect = effect(() => {
    const progressData = this.institutionalRequestStore.progressData();
    while (this.systemAdminInfoControl.controls.length > 0) {
      this.systemAdminInfoControl.removeAt(0);
      untracked(() => {
        this.systemAdminInfo.set([])
      })
    }
    progressData?.adminInfos?.forEach((adminInfo) => {
      untracked(() => {
        this.systemAdminInfo.update((info) => {
          info.push({
            email: adminInfo?.email ?? '',
            firstName: adminInfo?.firstName ?? '',
            lastName: adminInfo?.lastName ?? ''
          });
          return [...info];
        });
      });

      this.systemAdminInfoControl.push(
        this.fb.nonNullable.group({
          email: [adminInfo?.email, [Validators.required, Validators.email]],
          firstName: [adminInfo?.firstName, [Validators.required]],
          lastName: [adminInfo?.lastName, [Validators.required]]
        })
      );
    });
  });

  systemAdminInfo = signal<{ email: string, firstName: string, lastName: string }[]>([]);

  get systemAdminInfoControl() {
    return this.form.get('adminInfos') as FormArray;
  }

  constructor() {
    // console.log('CompleteGetStartedComponent', this.progressData);
  }

  removeAdmin($index: number) {
    this.systemAdminInfoControl.removeAt($index);
    this.systemAdminInfo.update((info) => {
      info.splice($index, 1);
      return [...info];
    });
  }

  addAdmin() {
    this.systemAdminInfoControl.push(
      this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
      })
    );
    this.systemAdminInfo.update((info) => {
      info.push({
        email: '',
        firstName: '',
        lastName: ''
      });
      return [...info];
    });
  }

  saveInfo() {
    this.institutionalRequestStore.saveProgressData(this.form.value.adminInfos ?? []).subscribe({
      next: async () => {
        await this.ionNav().push(SummaryComponent, {
          ionNav: this.ionNav()
        }, {});
        this.institutionalRequestStore.updateCurrentStep('summary');
      }
    });
  }
}
