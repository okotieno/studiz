import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonSelect } from '@ionic/angular/standalone';

@Component({
  selector: 'studiz-user-button',
  standalone: true,
  imports: [
    IonSelect
  ],
  templateUrl: './country-select.component.html',
  styleUrl: './country-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectComponent {

}
