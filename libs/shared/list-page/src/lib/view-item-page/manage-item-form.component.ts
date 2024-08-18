import { computed, Directive, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonPopover } from '@ionic/angular/standalone';

@Directive()
export abstract class ManageItemFormComponent<T extends { id?: number }> {
  fb = inject(FormBuilder);
  popover = viewChild(IonPopover);
  itemCreated = output<{ id: number }>();
  itemUpdated = output<{ id: number }>();
  isOpen = false;
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];
  abstract form: FormGroup;
  submitted = signal(false);

  get hasUnsavedChanges(): boolean {
    return this.form.dirty && !this.submitted();
  }

  item = input<T | undefined>(undefined);

  itemId = computed(() => (this.item() as { id: number }).id);

  isEditingForm = computed(() => {
    const item = this.item();
    return item?.id && item?.id > 0;
  });

  itemSetEffect = effect(() => {
    const item = this.item();
    const isEditForm = this.isEditingForm();
    if (isEditForm) {
      this.form.patchValue(item as T);
    }
  });
}
