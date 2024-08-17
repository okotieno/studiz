import { Component, inject, OnInit } from '@angular/core';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow
} from '@ionic/angular/standalone';
import { AuthService } from '@studiz/frontend/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_NAME } from '@studiz/frontend/constants';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    GoogleSigninButtonModule,
    IonContent,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonItem,
    IonLabel,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  router = inject(Router);
  authState$ = inject(AuthService).authState$.pipe(
    tap(async (loggedIn) => {
      if (loggedIn) {
        await this.router.navigate(['/home']);
      }
    }),
    takeUntilDestroyed()
  );
  appName = inject(APP_NAME);

  ngOnInit() {
    this.authState$.subscribe();
  }
}
