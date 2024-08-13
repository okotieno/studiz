import { Component, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { ThemeStore } from '@studiz/theme';

@Component({
  standalone: true,
  selector: 'studiz-logo',
  templateUrl: './logo.component.svg'
})
export class LogoComponent {
  readonly themeStore = inject(ThemeStore);
  primaryColor = signal(this.getColor('--ion-color-primary'));
  secondaryColor = signal(this.getColor('--ion-color-secondary'));

  themeChangeEffect = effect(() => {
    this.themeStore.currentTheme();
    untracked(() => {
      this.primaryColor.set(this.getColor('--ion-color-primary'));
      this.secondaryColor.set(this.getColor('--ion-color-secondary'));
    });
  });

  getColor(color: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(color).trim();
  }


}
