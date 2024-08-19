import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonRow,
  IonText,
  IonToolbar
} from '@ionic/angular/standalone';
import { UserSettingsComponent } from '@studiz/user-setting';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegisterInstitutionRequestGQL } from '@studiz/frontend/institution-request-frontend-service';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';

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
      .subscribe();
  }
}
