import { Component, effect, inject, input } from '@angular/core';
import { IonApp, IonNav } from '@ionic/angular/standalone';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthStore } from '@studiz/frontend/auth';
import { JsonPipe } from '@angular/common';
import { from, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';

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
        switchMap(authenticated => {
          if (authenticated) {
            return from(this.router.navigate(['/']));
          } else {
            return from(this.router.navigate(['/login']));
          }
        }),
        take(1)
      ).subscribe();
    }
  });

  component = LoginFormComponent;

}
