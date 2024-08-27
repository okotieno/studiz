import { Component, inject, signal } from '@angular/core';
import { IonButton, IonCol, IonIcon, IonNav, IonRow, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { AdminInfoComponent } from '../admins-info/admin-info.component';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';

@Component({
  selector: 'studiz-complete-get-started',
  standalone: true,
  imports: [
    IonSegment,
    IonSegmentButton,
    IonIcon,
    IonCol,
    IonRow,
    IonButton,
    IonNav
  ],
  templateUrl: './complete-get-started.component.html',
  styleUrl: './complete-get-started.component.css',
  providers: []
})
export class CompleteGetStartedComponent {

  currentStep = inject(InstitutionalRequestStore).currentStep;
  component = AdminInfoComponent

  setActiveSegment($event: any) {
    console.log({$event})
  }
}
