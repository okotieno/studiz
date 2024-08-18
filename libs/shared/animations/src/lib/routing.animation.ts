import { Animation, AnimationController } from '@ionic/angular/standalone';

export const routingAnimation = (_: HTMLElement, opts: any): Animation => {

  const animationCtrl = new AnimationController();
  // create root transition
  const rootTransition = animationCtrl
    .create()
    .duration(opts.duration || 500)
    .easing('ease-in');

  const enterTransition = animationCtrl.create().addElement(opts.enteringEl);
  const exitTransition = animationCtrl.create().addElement(opts.leavingEl);

  enterTransition.fromTo('opacity', '0', '1');
  exitTransition.fromTo('opacity', '1', '0');

  if (opts.direction === 'forward') {
    enterTransition.fromTo('transform', 'translateX(-10.5%)', 'translateX(0%)');
    exitTransition.fromTo('transform', 'translateX(0%)', 'translateX(10.5%)');
  } else {
    enterTransition.fromTo('transform', 'translateX(10.5%)', 'translateX(0%)');
    exitTransition.fromTo('transform', 'translateX(0%)', 'translateX(-10.5%)');
  }

  rootTransition.addAnimation([enterTransition, exitTransition]);
  return rootTransition;
};
