import { Component, viewChild } from '@angular/core';
import { IonNav, ViewDidLeave } from '@ionic/angular/standalone';
import { GetStartedComponent } from './get-started.component';

@Component({
  standalone: true,
  imports: [
    IonNav
  ],
  template: `
    <ion-nav [root]="component" [rootParams]="{ ionNav: ionNav() }"></ion-nav>
  `
})
export class NavComponent implements ViewDidLeave {
  ionNav = viewChild.required(IonNav)
  component = GetStartedComponent;
  async ionViewDidLeave() {
    await this.ionNav().popToRoot();
  }
}
