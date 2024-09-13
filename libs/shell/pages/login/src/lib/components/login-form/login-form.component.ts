import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { slideLeftAnimation, slideRightAnimation } from './slide-left.animation';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular/standalone';
import { take, tap, timer } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { SHOW_ERROR_MESSAGE } from '@studiz/frontend/constants';
import { AuthStore } from '@studiz/frontend/auth';

@Component({
  selector: 'studiz-shell-login-page',
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    TitleCasePipe
  ],
  templateUrl: './shell-login-page.component.html',
  styleUrl: './shell-login-page.component.css',
  animations: [
    slideLeftAnimation,
    slideRightAnimation
  ]
})
export class LoginFormComponent {
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
    this.authStore.requestLoginLink(this.usernameField.value).subscribe();
  }
}
