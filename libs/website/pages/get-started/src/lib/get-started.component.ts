import { Component, effect, inject, input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem, IonNav,
  IonRow,
  IonText,
  IonToolbar, NavController
} from '@ionic/angular/standalone';
import { UserSettingsComponent } from '@studiz/user-setting';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegisterInstitutionRequestGQL } from '@studiz/frontend/institution-request-frontend-service';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';
import { SuccessComponent } from './success.component';
import { tap } from 'rxjs';

@Component({
  selector: 'studiz-get-started',
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonRow,
    IonToolbar,
    UserSettingsComponent,
    IonInput,
    IonItem,
    IonText,
    ReactiveFormsModule
  ],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {
  ionNav = input.required<IonNav>();
  testEffect = effect(() => {

    console.log(this.ionNav());
  })
  navCtrl = inject(NavController);
  fb = inject(FormBuilder);
  registerInstitutionRequestGQL = inject(IRegisterInstitutionRequestGQL);
  form = this.fb.nonNullable.group({
    institutionName: ['', [Validators.required]],
    adminEmail: ['', [Validators.required, Validators.email]],
  });

  get formValue() {
    return this.form.value as Required<typeof this.form.value>;
  }

  submit() {

    this.registerInstitutionRequestGQL.mutate({
      input: this.formValue
    }, { context: { [SHOW_SUCCESS_MESSAGE]: true, [SHOW_ERROR_MESSAGE]: true } })
      .pipe(
        tap(res => {
          this.ionNav().push(SuccessComponent, {
            successMessage: res.data?.registerInstitutionRequest?.message
          })

        })
      )
      .subscribe();
  }
}
