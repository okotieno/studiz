import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonRow,
} from '@ionic/angular/standalone';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ICreateInstitutionRequestMutationVariables,
  InstitutionRequestFrontendService,
} from '@studiz/frontend/institution-request-frontend-service';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { ManageItemFormComponent } from '@studiz/frontend/list-page';
import { IHasUnsavedChanges } from '@studiz/frontend/form-exit-guard';
import { IInstitutionRequestModel } from '@studiz/shared/types/frontend';
import { UserButtonComponent } from '@studiz/frontend/side-nav';

@Component({
  selector: 'studiz-institution-request-details-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonRow,
    IonInput,
    IonCol,
    IonButton,
    IonFooter,
    IonIcon,
    IonContent,
    RouterLink,
    NgTemplateOutlet,
    UserButtonComponent,
  ],
  template: `
    <!--    <ion-content>-->
    <form
      id="manage-institution-request-form"
      [formGroup]="form"
      class="ion-padding-top"
    >
      <ion-row class="ion-wrap">
        <ion-col class="ion-margin-bottom" [size]="12">
          <ion-input
            label-placement="floating"
            label="Name"
            placeholder="Name"
            fill="outline"
            formControlName="name"
          >
            <ng-container
              *ngTemplateOutlet="
                successCheckmark;
                context: { $implicit: 'name' }
              "
            ></ng-container>
          </ion-input>
        </ion-col>
      </ion-row>
    </form>
    <!--    </ion-content>-->
    <ion-footer class="ion-padding ion-no-border">
      <ion-row class="ion-justify-content-between">
        <ion-button [routerLink]="['/institution-requests']" fill="outline"
          >Cancel</ion-button
        >
        <ion-button
          [disabled]="form.invalid || form.pristine"
          (click)="submit()"
        >
          @if (isEditingForm()) { Save } @else { Create }
          InstitutionRequest</ion-button
        >
      </ion-row>
    </ion-footer>

    <ng-template #successCheckmark let-control>
      @if (form.get(control)?.touched && form.get(control)?.valid) {
      <ion-icon color="success" name="check" slot="end"></ion-icon>
      }
    </ng-template>
  `,
})
export class InstitutionRequestDetailsComponent
  extends ManageItemFormComponent<IInstitutionRequestModel>
  implements IHasUnsavedChanges
{
  form = this.fb.group({
    name: ['', [Validators.required]],
  });

  private institutionRequestService = inject(InstitutionRequestFrontendService);

  constructor() {
    super();
  }

  submit() {
    this.institutionRequestService
      .createItem({
        ...this.form.value,
      } as ICreateInstitutionRequestMutationVariables)
      .pipe(
        tap((res) => {
          this.submitted.set(true);
          if (res?.data?.id) {
            this.itemCreated.emit(res?.data as { id: number });
          }
        })
      )
      .subscribe();
  }
}
