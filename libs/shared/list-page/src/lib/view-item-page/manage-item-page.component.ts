import { computed, Directive, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IonPopover, NavController } from '@ionic/angular/standalone';
import { StepperComponent } from '@studiz/stepper';
import { ActivatedRoute } from '@angular/router';
import { plural } from '@studiz/utils/plural';

@Directive()
export abstract class ManageItemPageComponent<T> implements OnInit {
  abstract entity: string;

  async itemCreated($event: { id: number }) {
    this.item.set($event as T);
    await this.navigateToItem();
  }

  route = inject(ActivatedRoute);
  item = signal<T | undefined>(undefined);
  itemId = computed(() =>
    (this.item() as { id: number }).id
  );
  isEditingForm = computed(() => Number(this.item()?.['id' as keyof T]) > 0);
  @ViewChild('popover') popover?: IonPopover;
  breadcrumbIsOpen = signal(false);
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];

  @ViewChild(StepperComponent) stepper?: StepperComponent;
  selectedIndex = 0;

  navCtrl = inject(NavController);

  ngOnInit(): void {
    if (this.route.snapshot.data[this.entity]) {
      this.item.set(this.route.snapshot.data[this.entity]);
    }
  }

  async navigateToItem() {
    await this.navCtrl.navigateForward([`/${plural(this.entity)}`, this.itemId()]);
  }

  async presentPopover(e: Event) {
    if (this.popover) {
      this.collapsedBreadcrumbs = (e as CustomEvent).detail.collapsedBreadcrumbs;
      this.popover.event = e;
      this.breadcrumbIsOpen.set(true);
    }
  }
}
