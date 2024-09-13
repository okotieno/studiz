import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideLeftAnimation = trigger('slideLeft', [
  state(
    'open',
    style({
      transform: 'translateX(0)',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateX(calc(-120%))',
      opacity: 0.5,
    })
  ),
  transition('open => closed', [animate('0.5s')]),
  transition('closed => open', [animate('0.5s')])
])

export const slideRightAnimation = trigger('slideRight', [
  state(
    'open',
    style({
      transform: 'translateX(-100%)',
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      transform: 'translateX(calc(20%))',
      opacity: 0.5,
    })
  ),
  transition('open => closed', [animate('0.5s')]),
  transition('closed => open', [animate('0.5s')])
])
