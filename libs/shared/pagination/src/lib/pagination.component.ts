import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { IonButton, IonContent, IonIcon, IonRow, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'studiz-pagination',
  standalone: true,
  imports: [IonRow, IonSelect, IonSelectOption, IonButton, IonIcon, IonContent, JsonPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  currentPageIndex = signal(0);
  pageSize = signal(0);
  startRange = computed(() => Math.max(this.currentPageIndex() * this.pageSize() + 1, 1));
  disabledNextButtons = computed(() => this.endRange() === this.totalItems);
  disabledPrevButtons = computed(() => this.startRange() === 1);
  @Output() paginationValueChange = new EventEmitter<{
    currentPage: number,
    pageSize: number
  }>();
  @Input() selectOptions = [10, 20, 50, 100];

  private _paginationValue = {
    currentPage: 0,
    pageSize: 20
  };

  @Input({ required: true })
  get paginationValue(): { pageSize: number; currentPage: number } {
    return this._paginationValue;
  }

  set paginationValue(value: { pageSize: number; currentPage: number }) {
    this.currentPageIndex.set(value.currentPage - 1);
    this.pageSize.set(value.pageSize);
    this._paginationValue = value;
  }

  private _totalItems = signal(0);

  endRange = computed(() =>
    Math.min(this.startRange() + this.pageSize() - 1, this._totalItems())
  );
  lastPage = computed(() => Math.ceil(this._totalItems() / this.pageSize()));

  @Input({ required: true })

  get totalItems() {
    return this._totalItems();
  }

  set totalItems(value: number) {
    this._totalItems.set(value);
  }
}
