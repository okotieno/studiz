import { Component, inject } from '@angular/core';
import { ThemeStore } from '@studiz/theme';

@Component({
  standalone: true,
  selector: 'studiz-logo',
  templateUrl: './logo.component.svg'
})
export class LogoComponent {
  readonly themeStore = inject(ThemeStore);
  primaryColor = this.themeStore.primaryColor;
  secondaryColor = this.themeStore.secondaryColor;
}
