import { Component } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';
import { IonCol, IonIcon, IonRow } from '@ionic/angular/standalone';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'furaha-stepper',
  standalone: true,
  imports: [
    NgTemplateOutlet, IonRow, IonCol, IonIcon
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        height: '0',
        pointerEvents: 'none'
      })),
      transition('open => closed', [
        animate('.3s')
      ]),
      transition('closed => open', [
        animate('.5s')
      ])
    ])
  ]
})
export class StepperComponent extends CdkStepper {

  handleNavigation(index: number) {
    if(!this.linear) {
      this.selectedIndex = index
    }

  }
}
