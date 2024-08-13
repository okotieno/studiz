import { Component, inject, Inject } from '@angular/core';
import { IonApp, IonButton, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [IonRouterOutlet, IonButton, IonApp],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {

  }
}
