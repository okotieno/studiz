import { Component, inject } from '@angular/core';
import { ThemeStore } from '@studiz/theme';

@Component({
  selector: 'studiz-not-found-illustration',
  standalone: true,
  templateUrl: `./not-found-illustration.component.svg`,
})

export class NotFoundIllustrationComponent {
  themeStore = inject(ThemeStore);

  primaryColor = this.themeStore.primaryColor;
  secondaryColor = this.themeStore.secondaryColor;
  dangerColor = this.themeStore.dangerColor;
}
