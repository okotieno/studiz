import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'studiz-admissions-entry',
  template: `<studiz-nx-welcome></studiz-nx-welcome>`,
})
export class RemoteEntryComponent {}
