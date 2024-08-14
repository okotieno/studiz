import { Component, inject } from '@angular/core';
import { ThemeStore } from '@studiz/theme';

@Component({
  selector: 'studiz-icon-user-gear',
  standalone: true,
  templateUrl: `./user-gear.component.svg`,
  styles: [
    `:host {
      width: 32px;
    }`
  ]
})

export class UserGearComponent {
  themeStore = inject(ThemeStore);

  primaryColor = this.themeStore.primaryColor;
  secondaryColor = this.themeStore.secondaryColor;
}
