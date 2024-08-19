import { Component, inject } from '@angular/core';
import { ThemeStore } from '@studiz/theme';

@Component({
  selector: 'studiz-done-illustration',
  standalone: true,
  templateUrl: `./done-illustration.component.svg`,
})

export class DoneIllustrationComponent {
  themeStore = inject(ThemeStore);

  primaryColor = this.themeStore.primaryColor;
  secondaryColor = this.themeStore.secondaryColor;
  successColor = this.themeStore.successColor;
}
