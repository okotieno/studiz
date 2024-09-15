import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { slideLeftAnimation, slideRightAnimation } from './slide-left.animation';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonApp, IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonInput,
  IonNav,
  IonRow,
  IonToolbar
} from '@ionic/angular/standalone';
import { take, tap, timer } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { AuthStore } from '@studiz/frontend/auth';
import { SuccessPageComponent } from '@studiz/frontend/success-page';
import { UserSettingsComponent } from '@studiz/user-setting';

@Component({
  selector: 'studiz-shell-login-page',
  standalone: true,
  imports: [
    IonApp,
    ReactiveFormsModule,
    TitleCasePipe,
    UserSettingsComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonContent,
    IonRow,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCol,
    IonInput,
    IonIcon,
    IonButton,
    IonFooter
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  animations: [
    slideLeftAnimation,
    slideRightAnimation
  ]
})
export class LoginFormComponent {
  ionNav = inject(IonNav);
  authStore = inject(AuthStore);
  passwordInputElement = viewChild.required<IonInput>('passwordInputElement');
  currentLoginStep = signal<'username' | 'password'>('username');
  showEmailField = computed(() => this.currentLoginStep() === 'username' ? 'open' : 'closed');
  showPasswordField = computed(() => this.currentLoginStep() === 'password' ? 'open' : 'closed');
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  showPasswordText = signal(false);
  showPasswordIcon = computed(() => this.showPasswordText() ? 'eye-slash' : 'eye');
  showPasswordType = computed(() => this.showPasswordText() ? 'text' : 'password');

  get usernameField() {
    return this.form.get('username') as FormControl<string>;
  }

  focusOnPasswordField($event: Event) {
    console.log(this.passwordInputElement());
    if (this.usernameField.valid) {
      this.currentLoginStep.set('password');
      timer(500).pipe(
        take(1),
        tap(async () => {
          await this.passwordInputElement().setFocus();
        })
      ).subscribe();
    } else {
      this.usernameField.markAsTouched();
    }
    console.log($event);
  }

  sendLoginLink() {
    this.authStore.requestLoginLink(this.usernameField.value).pipe(
      tap(async (res) => {
        console.log(res.data?.requestLoginLink?.message)
        await this.ionNav.push(SuccessPageComponent, {
          successMessage: res.data?.requestLoginLink?.message
        });
      })
    ).subscribe();
  }
}
