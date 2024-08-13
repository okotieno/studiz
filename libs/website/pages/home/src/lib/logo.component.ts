import { Component, OnInit, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'studiz-logo',
  templateUrl: './logo.component.svg'
})
export class LogoComponent implements OnInit{
  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => {
      const temp = this.secondaryColor();
      this.secondaryColor.set(this.primaryColor());
      this.primaryColor.set(temp);
    });
  }
  primaryColor = signal(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary').trim());
  secondaryColor = signal(getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary').trim());
  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    console.log(this.primaryColor);
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}
