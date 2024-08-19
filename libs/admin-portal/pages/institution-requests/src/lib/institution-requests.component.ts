import { Component, inject, OnInit } from '@angular/core';
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPopover,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { UserButtonComponent } from '@studiz/frontend/side-nav';
import { InstitutionRequestFrontendService } from '@studiz/frontend/institution-request-frontend-service';
import {
  CrudTableComponent,
  ITableColumn,
  ListPageComponent,
} from '@studiz/frontend/list-page';
import { IInstitutionRequestModel } from '@studiz/shared/types/frontend';

@Component({
  selector: 'studiz-institution-requests-admin-portal',
  standalone: true,
  imports: [
    IonContent,
    CrudTableComponent,
    IonHeader,
    UserButtonComponent,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonBreadcrumbs,
    IonBreadcrumb,
    IonIcon,
    IonPopover,
    IonList,
    IonLabel,
    IonFab,
    IonFabButton,
    RouterLink,
    IonItem,
  ],
  templateUrl: './institution-requests.component.html',
  styleUrl: './institution-requests.component.scss',
})
export class InstitutionRequestsComponent
  extends ListPageComponent<IInstitutionRequestModel>
  implements OnInit
{
  allColumns: ITableColumn<IInstitutionRequestModel>[] = [
    { label: 'ID', key: 'id', fieldType: 'integer' },
    { label: 'Name', key: 'name' },
  ];

  constructor() {
    super();
  }

  institutionRequestService = inject(InstitutionRequestFrontendService);
  getItemsFn = this.institutionRequestService.getItems.bind(
    this.institutionRequestService
  );
  override deleteItemFn = this.institutionRequestService.deleteItem.bind(
    this.institutionRequestService
  );
}
