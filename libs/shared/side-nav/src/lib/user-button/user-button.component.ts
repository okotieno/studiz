import { ChangeDetectionStrategy, Component, signal, Signal, viewChild } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonPopover,
} from '@ionic/angular/standalone';
import { IUserModel } from '@studiz/shared/types/frontend';
import { AuthService } from '@studiz/frontend/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'studiz-user-button',
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
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserButtonComponent {
  popover = viewChild.required<IonPopover>(IonPopover);
  user: Signal<IUserModel | undefined | null>;
  isPopoverOpen = signal(false);

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  openPopover($event: MouseEvent) {
    this.popover().event = $event;
    this.isPopoverOpen.set(true);
  }
}
