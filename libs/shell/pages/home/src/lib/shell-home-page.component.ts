import { Component } from '@angular/core';
import { IonCard, IonCardHeader } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    RouterLink
  ],
  templateUrl: './shell-home-page.component.html',
  styleUrl: './shell-home-page.component.css',
})
export class ShellHomePageComponent {}
