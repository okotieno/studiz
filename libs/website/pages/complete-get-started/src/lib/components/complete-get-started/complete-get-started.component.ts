import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonIcon, IonNav, IonRow, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { InstitutionalRequestStore } from '../../store/institutional-request.store';
import { InstitutionInfoComponent } from '../institution-info/institution-info.component';

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
  component = InstitutionInfoComponent
}
