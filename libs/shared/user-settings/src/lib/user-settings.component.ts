import { Component, inject, signal, viewChild } from '@angular/core';
import { IonButton, IonContent, IonIcon, IonPopover, IonToggle } from '@ionic/angular/standalone';
import { UserGear } from '@studiz/icons';
import { FormsModule } from '@angular/forms';
import { ThemeStore } from '@studiz/theme';

@Component({
  selector: 'studiz-user-settings',
  standalone: true,
  imports: [
    IonPopover,
    IonButton,
    UserGear,
    IonPopover,
    IonContent,
    IonToggle,
    FormsModule,
    IonIcon
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent {
  isPopoverOpen = signal(false);
  readonly themeStore = inject(ThemeStore);

  toggleChange(checked: boolean) {
    this.themeStore.setTheme(checked ? 'dark' : 'light');
  }

  popover = viewChild.required(IonPopover);

  presentPopover(e: Event) {
    this.popover().event = e;
    this.isPopoverOpen.set(true);
  }
}
