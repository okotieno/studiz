import { Component, Input, OnInit } from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
  CdkTable
} from '@angular/cdk/table';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonIcon,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSkeletonText
} from '@ionic/angular/standalone';
import { PaginationComponent } from '@studiz/pagination';
import { ListPageComponent } from '../list-page/list-page.component';
import { ITableColumn } from '../list-page.interface';
import { IQueryParams } from '@studiz/shared/types/frontend';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'studiz-crud-table',
  standalone: true,
  imports: [
    CdkTable,
    CdkColumnDef,
    IonButton,
    IonIcon,
    CdkHeaderCell,
    ReactiveFormsModule,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonCol,
    IonInput,
    CdkHeaderRow,
    CdkRow,
    IonSkeletonText,
    PaginationComponent,
    CdkHeaderCellDef,
    CdkHeaderRowDef,
    CdkRowDef,
    CdkCell,
    CdkCellDef,
    RouterLink
  ],
  templateUrl: './crud-table.component.html',
  styleUrl: './crud-table.component.scss'
})
export class CrudTableComponent extends ListPageComponent<{ [key: string | number]: string }> implements OnInit {
  @Input({ required: true }) allColumns: ITableColumn<any>[] = [];
  @Input({ required: true }) getItemsFn!: (queryParams: IQueryParams) => Observable<{
    meta: { totalItems: number },
    items: any[]
  }>;

  @Input({ required: true }) declare deleteItemFn: (id: number) => Observable<{
    message: string
  } | null | undefined>;

  constructor() {
    super();
  }
}

