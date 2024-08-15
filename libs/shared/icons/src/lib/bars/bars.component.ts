import { Component, inject } from '@angular/core';
import { ThemeStore } from '@studiz/theme';

@Component({
  selector: 'studiz-icon-bars',
  standalone: true,
  templateUrl: `./bars.component.svg`,
})

export class BarsComponent {
  themeStore = inject(ThemeStore);

  primaryColor = this.themeStore.primaryColor;
  secondaryColor = this.themeStore.secondaryColor;
}
