import { Component, ElementRef, signal, viewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader, IonItem, IonList, IonPopover,
  IonRouterOutlet,
  IonRow,
  IonToolbar
} from '@ionic/angular/standalone';
import { UserSettingsComponent } from '@studiz/user-setting';
import { Bars } from '@studiz/icons';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'studiz-website-layout',
  standalone: true,
  imports: [
    IonContent,
    Bars,
    IonHeader,
    IonRow,
    IonCol,
    IonToolbar,
    IonButton,
    IonButtons,
    UserSettingsComponent,
    IonRouterOutlet,
    IonPopover,
    IonList,
    IonItem,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './website-layout.component.html',
  styleUrl: './website-layout.component.css',
})
export class WebsiteLayoutComponent {
  menuPopover = viewChild.required<IonPopover>(IonPopover);
  menuPopoverIsOpen = signal(false);
  openMenuPopover(e: any) {
    this.menuPopover().event = e;
    this.menuPopoverIsOpen.set(true)
  }
}
