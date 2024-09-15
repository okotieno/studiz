import { Component, effect, inject, input } from '@angular/core';
import { IonApp, IonNav } from '@ionic/angular/standalone';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthStore } from '@studiz/frontend/auth';
import { JsonPipe } from '@angular/common';
import { switchMap, take, tap } from 'rxjs';
import { Router } from 'express';

@Component({
  selector: 'studiz-shell-login-page',
  standalone: true,
  imports: [
    IonNav,
    IonApp,
    JsonPipe
  ],
  templateUrl: './shell-login-page.component.html',
  styleUrl: './shell-login-page.component.css'
})
export class ShellLoginPageComponent {
  authStore = inject(AuthStore);
  accessToken = input<string>();
  router = inject(Router);
  accessTokenChangeEffect = effect(() => {
    const accessToken = this.accessToken();
    if (accessToken) {
      this.authStore.authenticate({ accessToken }).pipe(
        // switchMap(authenticated => this.router.navigate(['/'])),
        take(1)
      ).subscribe();
    }
  }, { allowSignalWrites: true });

  isAuthenticated = this.authStore.isAuthenticated;
  isAuthenticatedEffect = effect(() => {
    const isAuthenticated = this.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    if (this.authStore.isAuthenticated()) {
      console.log('isAuthenticated');
    }
  });

  component = LoginFormComponent;

}
