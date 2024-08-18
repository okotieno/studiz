export interface ITableColumn<T> {
  label: string;
  key: keyof T;
  fieldType?: 'integer' | 'date';
}
