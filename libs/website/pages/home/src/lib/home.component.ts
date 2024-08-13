import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component, computed,
  contentChild,
  ElementRef,
  viewChild
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonRow,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

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
    IonToggle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterContentInit {
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

  toggleDarkMode() {

  }

}
