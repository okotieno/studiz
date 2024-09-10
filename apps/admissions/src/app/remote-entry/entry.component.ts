import { Component, inject } from '@angular/core';
import { APP_ENVIRONMENT } from '@studiz/frontend/constants';

@Component({
  standalone: true,
  imports: [],
  selector: 'studiz-admissions-entry',
  template: `
    Works
  `,
})
export class RemoteEntryComponent {
  environment = inject(APP_ENVIRONMENT);
  constructor() {
    console.log('RemoteEntryComponent', this.environment);
  }
}
