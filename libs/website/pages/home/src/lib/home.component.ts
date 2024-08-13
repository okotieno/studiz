import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component, computed,
  contentChild,
  ElementRef, inject, OnInit, signal,
  viewChild
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader, IonImg,
  IonRow,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './logo.component';
import { ThemeStore } from '@studiz/theme';

Swiper.use([Navigation]);

@Component({
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonRow,
    IonCol,
    IonToggle,
    FormsModule,
    IonImg,
    LogoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterContentInit {
  readonly themeStore = inject(ThemeStore);
  paletteToggle = signal(false);

  toggleChange() {
    this.themeStore.setTheme(this.paletteToggle() ? 'dark' : 'light');
  }

  swiperContainer = viewChild.required<ElementRef<HTMLDivElement>>('swiper');
  initializeSwiper = computed(() => new Swiper(this.swiperContainer().nativeElement, {

    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        origin: 'left center',
        translate: ['-5%', 0, -200],
        rotate: [0, 100, 0]
      },
      next: {
        origin: 'right center',
        translate: ['5%', 0, -200],
        rotate: [0, -100, 0]
      }
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar'
    }
  }));

  ngAfterContentInit() {
    this.initializeSwiper();
  }

}
