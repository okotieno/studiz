import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonInput, IonModal,
  IonRow, IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone';
import { catchError, tap } from 'rxjs';
import { AuthStore } from '@studiz/frontend/auth';

@Component({
  selector: 'studiz-send-login-link-form',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonRow,
    IonCol,
    ReactiveFormsModule,
    IonInput,
    IonIcon,
    IonFooter,
    IonButton,
    IonModal,
    IonTitle
  ],
  templateUrl: './send-login-link-form.component.html',
  styleUrl: './send-login-link-form.component.css'
})
export class SendLoginLinkFormComponent {
  email = input<string, string>('', {
    transform: (value: string) => value?.trim() ?? ''});
  emailInputChangeEffect = effect(() => {
    const email = this.email();
    if (email) {
      this.emailFieldControl.setValue(email);
    }

  });
  modalCtrl = inject(ModalController);
  authStore = inject(AuthStore);
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get emailFieldControl() {
    return this.form.get('email') as FormControl<string>;
  }


  submit() {
    this.authStore.requestLoginLink(this.emailFieldControl.value).pipe(
      tap(async (res) => {
        await this.modalCtrl.dismiss(res.data?.requestLoginLink, 'submitted');
      }),
    ).subscribe();
  }

  async closeModal() {
    await this.modalCtrl.dismiss(null);
  }
}
