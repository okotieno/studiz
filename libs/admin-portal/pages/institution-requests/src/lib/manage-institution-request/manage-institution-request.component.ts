import { Component, viewChild } from '@angular/core';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonBreadcrumbs,
  IonBreadcrumb,
  IonIcon,
} from '@ionic/angular/standalone';
import { StepperComponent } from '@studiz/stepper';
import { CdkStep } from '@angular/cdk/stepper';
import { InstitutionRequestDetailsComponent } from './institution-request-details.component';
import { ManageItemPageComponent } from '@studiz/frontend/list-page';
import { IInstitutionRequestModel } from '@studiz/shared/types/frontend';
import { IHasUnsavedChanges } from '@studiz/frontend/form-exit-guard';
import { UserButtonComponent } from '@studiz/frontend/side-nav';

@Component({
  selector: 'studiz-manage-institution-request',
  standalone: true,
  imports: [
    IonBreadcrumb,
    IonBreadcrumbs,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    StepperComponent,
    CdkStep,
    InstitutionRequestDetailsComponent,
    UserButtonComponent,
  ],
  templateUrl: './manage-institution-request.component.html',
  styleUrl: './manage-institution-request.component.css',
})
export class ManageInstitutionRequestComponent
  extends ManageItemPageComponent<IInstitutionRequestModel>
  implements IHasUnsavedChanges
{
  entity = 'institution-request';
  institutionRequestDetailsComponent = viewChild(
    InstitutionRequestDetailsComponent
  );

  get hasUnsavedChanges() {
    return (
      this.institutionRequestDetailsComponent()?.hasUnsavedChanges || false
    );
  }

  constructor() {
    super();
  }
}
