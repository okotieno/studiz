import { ChangeDetectionStrategy, Component, signal, Signal, viewChild } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonPopover,
} from '@ionic/angular/standalone';
import { AuthService } from '@studiz/frontend/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'studiz-notification-button',
  standalone: true,
  imports: [
    IonButton,
    IonAvatar,
    IonImg,
    IonIcon,
    IonPopover,
    IonContent,
    FormsModule
  ],
  templateUrl: './notification-button.component.html',
  styleUrl: './notification-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationButtonComponent {
  popover = viewChild.required<IonPopover>(IonPopover);
  // user: Signal<IUserModel | undefined | null>;
  isPopoverOpen = signal(false);

  constructor(private authService: AuthService) {
    // this.user = this.authService.user;
  }

  openPopover($event: MouseEvent) {
    this.popover().event = $event;
    this.isPopoverOpen.set(true);
  }
}
