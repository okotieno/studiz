import { Component, signal, ViewChild } from '@angular/core';
import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPopover,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { IInstitutionRequestModel } from '@studiz/shared/types/frontend';
import { UserButtonComponent } from '@studiz/frontend/side-nav';

@Component({
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonBreadcrumb,
    IonBreadcrumbs,
    IonButton,
    IonIcon,
    JsonPipe,
    IonCard,
    IonCardHeader,
    IonLabel,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonText,
    IonSkeletonText,
    DatePipe,
    IonButtons,
    IonMenuButton,
    IonList,
    IonPopover,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonListHeader,
    UserButtonComponent,
    RouterLink,
  ],
  templateUrl: './view-institution-request.component.html',
  styleUrl: './view-institution-request.component.scss',
})
export class ViewInstitutionRequestComponent {
  @ViewChild('popover') popover?: IonPopover;
  institutionRequest = signal<IInstitutionRequestModel>({ slug: '', adminEmail: '', institutionName: '', id: 0 });

  isOpen = false;
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];
  constructor(route: ActivatedRoute) {
    this.institutionRequest.set(route.snapshot.data['institutionRequest']);
  }
  async presentPopover(e: Event) {
    if (this.popover) {
      this.collapsedBreadcrumbs = (
        e as CustomEvent
      ).detail.collapsedBreadcrumbs;
      this.popover.event = e;
      this.isOpen = true;
    }
  }
}
