import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonButton, IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { NotificationButtonComponent, UserButtonComponent } from '@studiz/frontend/side-nav';
import { UserSettingsComponent } from '@studiz/user-setting';

@Component({
  selector: 'studiz-home',
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonMenuToggle, IonButton, IonIcon, UserButtonComponent, IonButtons, UserSettingsComponent, NotificationButtonComponent, IonRow],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
}
