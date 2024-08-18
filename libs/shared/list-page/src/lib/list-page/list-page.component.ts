import {
  computed,
  Directive,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
  untracked,
  WritableSignal
} from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { ITableColumn } from '../list-page.interface';
import { IQueryOperatorEnum, IQueryParams, IQueryParamsFilter, ISortByEnum } from '@studiz/shared/types/frontend';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DefaultPage } from '../default-page/default-page';


@Directive()
export abstract class ListPageComponent<T> extends DefaultPage implements OnInit {
  abstract allColumns: ITableColumn<T>[];
  itemsCount = input(0);
  itemsCountChange = output<number>();
  fetchInitialData = input(true);
  abstract getItemsFn: (queryParams: IQueryParams) => Observable<{ meta: { totalItems: number }, items: T[] }>;
  deleteItemFn?: (id: number) => Observable<{ message: string } | undefined | null>;
  paginationValue = { pageSize: 10, currentPage: 1 };
  alertController = inject(AlertController);
  filterApplied = signal(false);
  columns = signal<ITableColumn<T>[]>([]);
  mappedColumns = computed(() => this.columns().map(item => ({ ...item, key: String(item['key']) })));
  displayedColumns = computed(() => [...this.mappedColumns().map(({ key }) => key), 'actions']);
  contentsLoading = signal(false);
  items = signal<T[]>([]);
  sortBy = signal<keyof T>('id' as keyof T);
  sortByDirection = signal<ISortByEnum>(ISortByEnum.Asc);
  pageSize = signal(this.paginationValue.pageSize);
  skeletonList = computed(() => Array(this.pageSize()).fill(0).map((_val, index) => index));
  currentPage = signal(this.paginationValue.currentPage);
  // itemsCount = signal<number | null>(null);
  additionalFilters = input<IQueryParamsFilter[]>([]);
  additionalFiltersChangedEffect = effect(() => {
    this.additionalFilters();
    untracked(() => {
      this.getItems();
    });
  });
  fb = inject(FormBuilder);
  searchOptions = [
    { label: 'Contains', value: IQueryOperatorEnum.Contains },
    { label: 'Equals', value: IQueryOperatorEnum.Equals },
    { label: 'Less than;', value: IQueryOperatorEnum.LessThan },
    { label: 'Greater than', value: IQueryOperatorEnum.GreaterThan },
    { label: 'In', value: IQueryOperatorEnum.In },
    { label: 'Between', value: IQueryOperatorEnum.Between }
  ];
  searchForm: FormGroup<{
    [key: string]: FormArray<FormGroup<{ value?: FormControl<string>, operator?: FormControl<IQueryOperatorEnum> }>>
  }> = this.fb.group({});
  filtersTracker: WritableSignal<{ [K in keyof T]: string[] }> = signal({} as { [K in keyof T]: string[] });
  extraColumns = computed(() => {
    const filtersTracker = this.filtersTracker();
    return Object.values(filtersTracker).flat().length > 0 ? ['applyFilter'] : [];
  });
  applyFilter = this.getItems.bind(this);

  protected constructor() {
    super();

    this.searchForm.valueChanges.pipe(
      tap(() => {
        this.filterApplied.set(false);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  get filters() {
    const transformed = [];
    for (const [field, items] of Object.entries(this.searchForm.value)) {
      if (items?.length && items.length > 0) {
        for (const { operator, value } of items) {
          transformed.push({
            field,
            operator,
            value,
            values: []
          });
        }
      }
    }
    return transformed;
  }

  ngOnInit() {
    this.contentsLoading.set(true);
    this.columns.set(this.allColumns);
    this.resetFormSearchControls();
    if (this.fetchInitialData()) {
      this.getItems();
    } else {
      this.contentsLoading.set(false);
    }

  }

  getItems() {
    this.filterApplied.set(true);
    this.contentsLoading.set(true);
    this.getItemsFn({
      currentPage: this.currentPage(),
      filters: [
        ...this.additionalFilters(),
        ...this.filters.filter(({ value }) => value)
          .map((value) => ({ ...value, value: String(value.value) }))
      ],
      pageSize: this.pageSize(),
      sortBy: String(this.sortBy()),
      sortByDirection: this.sortByDirection()
    }).pipe(
      tap((res) => {
        this.itemsCountChange.emit(res?.meta?.totalItems ?? 0);
        this.items.set(res?.items as T[] ?? []);
        this.contentsLoading.set(false);
      }),
      take(1)
    ).subscribe();
  }

  changeSort(key: keyof T) {
    if (key !== this.sortBy()) {
      this.sortByDirection.set(ISortByEnum.Asc);
    } else {
      this.sortByDirection.set(
        this.sortByDirection() === ISortByEnum.Asc ? ISortByEnum.Desc : ISortByEnum.Asc
      );
    }
    this.sortBy.set(key);

    this.getItems();
  }

  addFilter(key: keyof T) {
    const fieldType = this.allColumns.filter(({ key: keyValue }) => keyValue === key)[0].fieldType;
    (this.searchForm.get(key as string) as FormArray).push(this.fb.group({
      operator: [fieldType === 'integer' ? IQueryOperatorEnum.Equals : IQueryOperatorEnum.Contains],
      value: ['', [Validators.required]]
    }));
    const filtersTracker = { ...this.filtersTracker() };
    if (!filtersTracker[key]) {
      filtersTracker[key] = [];
    }
    filtersTracker[key].push(`${key as string}-${Math.random()}`);
    this.filtersTracker.set(filtersTracker);
  }

  removeFilter(key: keyof T, filterIndex: number) {

    const filtersTracker = { ...this.filtersTracker() };
    filtersTracker[key].splice(filterIndex, 1);
    (this.searchForm.get(key as string) as FormArray).removeAt(filterIndex);
    this.filtersTracker.set(filtersTracker);

    if (this.filters.length === 0) {
      this.getItems();
    }
  }

  async confirmRemoveSearchField(key: keyof T, filterIndex: number) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'You are removing a search field, continue?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
        {
          text: 'Continue',
          role: 'confirm',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.removeFilter(key, filterIndex);
          }
        }]
    });

    await alert.present();
  }

  paginationValueChange($event: { currentPage: number; pageSize: number }) {
    this.paginationValue = $event;
    this.currentPage.set($event.currentPage);
    this.pageSize.set($event.pageSize);
    this.getItems();
  }

  private resetFormSearchControls() {
    const columns: ITableColumn<T>[] = this.columns();
    const controlNames = Object.keys(this.searchForm.controls);
    controlNames.forEach(controlName => {
      (this.searchForm as FormGroup).removeControl(controlName);
    });
    columns.forEach(controlName => {
      (this.searchForm as FormGroup).addControl(String(controlName.key), this.fb.array([]));
    });
  }


  async confirmDeleteItem(id: number) {
    const alert = await this.alertController.create({
      header: 'Delete confirmations',
      message: 'You are about to delete item, continue',
      cssClass: 'alert-danger',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
        {
          text: 'Continue',
          role: 'destructive',
          handler: () => {
            this.deleteItemFn?.(id).pipe(
              tap(() => {
                this.getItems();
              })
            ).subscribe();
          }
        }]
    });

    await alert.present();
  }
}
