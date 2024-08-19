import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonNav,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { NotificationButtonComponent, SideNavComponent, UserButtonComponent } from '@studiz/frontend/side-nav';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { UserSettingsComponent } from '@studiz/user-setting';

@Component({
  selector: 'studiz-layout',
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuToggle,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonRouterOutlet,
    SideNavComponent,
    IonButtons,
    IonIcon,
    IonNav,
    NavLinksComponent,
    NotificationButtonComponent,
    UserButtonComponent,
    UserSettingsComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  component = NavLinksComponent;
}
