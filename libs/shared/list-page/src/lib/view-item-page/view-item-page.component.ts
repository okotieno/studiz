import { Directive, signal, ViewChild } from '@angular/core';
import { IonPopover } from '@ionic/angular/standalone';

@Directive()
export class ViewItemPageComponent {
  @ViewChild('popover') popover?: IonPopover;
  breadcrumbIsOpen = signal(false);
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];

  async presentPopover(e: Event) {
    if (this.popover) {
      this.collapsedBreadcrumbs = (e as CustomEvent).detail.collapsedBreadcrumbs;
      this.popover.event = e;
      this.breadcrumbIsOpen.set(true);
    }
  }
}
