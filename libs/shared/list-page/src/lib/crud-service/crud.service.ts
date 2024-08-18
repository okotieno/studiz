import { inject } from '@angular/core';
import {
  Exact,
  InputMaybe,
  IPagination,
  IQueryOperatorEnum,
  IQueryParams,
  IQueryParamsFilter,
  ISortByEnum
} from '@studiz/shared/types/frontend';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Mutation, Query } from 'apollo-angular';
import { ToastController } from '@ionic/angular';
import { FetchPolicy } from '@apollo/client/core/watchQueryOptions';
import { plural } from '@studiz/utils/plural';
import { SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';

export abstract class CrudService<T> {

  abstract entity: string;
  idKey = 'id' as keyof T;
  labelKey = 'name' as keyof T;

  toastController: ToastController;

  protected constructor(
    private getItemsGQLQuery: Query<any, Exact<{ query?: InputMaybe<IQueryParams> | undefined; }>>,
    private getItemGQLQuery: Query<any, any>,
    private createItemGQLMutation: Mutation<any, any>,
    private updateItemGQLMutation: Mutation<any, any>,
    private deleteItemGQLMutation: Mutation<any, any>
  ) {
    this.toastController = inject(ToastController);
  }

  private get itemField() {
    return `${this.camalize(this.entity)}`;
  }

  private get itemsField() {
    return plural(this.camalize(this.entity));
  }

  private get createItemField() {
    return this.camalize(`create-${this.entity}`);
  }

  private get deleteItemField() {
    return this.camalize(`delete-${this.entity}`);
  }

  private get updateItemField() {
    return this.camalize(`update-${this.entity}`);
  }

  private camalize = (str: string) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) =>
      chr.toUpperCase()
    );
  };

  getItems({
             searchTerm,
             currentPage,
             pageSize,
             sortBy,
             sortByDirection,
             filters
           }: IQueryParams): Observable<{ items: T[], meta: IPagination }> {
    return this.getItemsGQLQuery.fetch({
      query: {
        searchTerm: searchTerm ?? '',
        currentPage: currentPage ?? 1,
        pageSize: pageSize ?? 20,
        sortBy: sortBy ?? 'id',
        sortByDirection: sortByDirection ?? ISortByEnum.Asc,
        filters: filters ?? []
      }
    }, { fetchPolicy: 'network-only' }).pipe(
      map((res) => res?.data?.[this.itemsField] ?? { items: [], meta: {} }),
      map((res) => res as { items: T[], meta: IPagination })
    );
  }

  getSearchItems({
                   searchTerm,
                   currentPage,
                   pageSize,
                   filterOptions = []
                 }: {
    pageSize: number,
    searchTerm: string,
    currentPage: number,
    filterOptions?: IQueryParamsFilter[]
  }): Observable<{
    items: T[],
    meta: IPagination
  }> {
    return this.getItemsGQLQuery.fetch({
      query: {
        currentPage,
        pageSize,
        sortBy: String(this.idKey),
        sortByDirection: ISortByEnum.Asc,
        filters: [{
          field: this.labelKey as string,
          value: searchTerm,
          operator: IQueryOperatorEnum.Contains
        }, ...filterOptions]
      }
    }).pipe(
      map((res) => res?.data?.[this.itemsField] ?? { items: [], meta: {} }),
      map((res) => res as { items: T[], meta: IPagination })
    );
  }

  getItemWithId(itemId: number | string, fetchPolicy: FetchPolicy = 'cache-first') {
    return this.getItemGQLQuery?.fetch({
      [this.idKey]: itemId
    }, { fetchPolicy }).pipe(
      map((res) => res?.data?.[this.itemField])
    );
  }

  createItem(params: any) {
    return this.createItemGQLMutation.mutate({ ...params }, {
      context: { [SHOW_SUCCESS_MESSAGE]: true }
    }).pipe(
      map((res) => res?.data?.[this.createItemField])
    );
  }

  updateItem({ id, params }: { id: number, params: any }) {
    return this.updateItemGQLMutation.mutate({ id, params },
      { context: { [SHOW_SUCCESS_MESSAGE]: true } }
    ).pipe(
      map((res) => res?.data?.[this.updateItemField]),
      map((res) => res?.data)
    );
  }

  deleteItem(id: number) {
    return this.deleteItemGQLMutation.mutate({ id },
      { context: { [SHOW_SUCCESS_MESSAGE]: true } }
    ).pipe(
      map((res) => res?.data?.[this.deleteItemField]),
      catchError((error) => {
        console.error('Error deleting item:', error);
        return EMPTY;
      })
    );
  }
}
