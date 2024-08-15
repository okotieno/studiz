import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput, IonItem,
  IonRow, IonText,
  IonToolbar
} from '@ionic/angular/standalone';
import { UserSettingsComponent } from '@studiz/user-setting';

@Component({
  selector: 'studiz-get-started',
  standalone: true,
  imports: [CommonModule, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonRow, IonToolbar, UserSettingsComponent, IonInput, IonItem, IonText],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css',
})
export class GetStartedComponent {}
