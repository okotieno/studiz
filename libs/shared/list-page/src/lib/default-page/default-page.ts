import { Directive, signal, viewChild } from '@angular/core';
import { IonPopover } from '@ionic/angular';

@Directive()
export class DefaultPage {

  popover = viewChild<IonPopover>('popover')
  isBreadcrumbPopoverOpen = signal(false);
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];
  async presentPopover(e: Event) {
    if (this.popover()) {
      this.collapsedBreadcrumbs = (e as CustomEvent).detail.collapsedBreadcrumbs;
      const popover = this.popover() as IonPopover;
      popover.event = e;
      this.isBreadcrumbPopoverOpen.set(true);
    }
  }
}
