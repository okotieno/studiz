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
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import { LogoComponent } from './logo.component';
import { RouterLink } from '@angular/router';

Swiper.use([Autoplay, Pagination, Keyboard]);

@Component({
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    LogoComponent,
    IonButton,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterContentInit {
  swiperContainer = viewChild.required<ElementRef<HTMLDivElement>>('swiper');
  initializeSwiper = computed(() => new Swiper(this.swiperContainer().nativeElement, {
    autoplay: {
      pauseOnMouseEnter: true,
      stopOnLastSlide: true
    },
    keyboard: {
      enabled: true
    },
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
    },
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
  }));

  ngAfterContentInit() {
    this.initializeSwiper();
  }

}
