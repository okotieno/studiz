import { IQueryOperatorEnum, IQueryParamsFilter, ISortByEnum, ISuccessResponse, IUserModel } from './types';

describe('TypeScript types', () => {
  test('IUserModel should have correct properties', () => {
    const user: IUserModel = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    };

    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    // Add more property assertions as needed
  });


  test('IQueryParamsFilter should have correct properties', () => {
    const filter: IQueryParamsFilter = {
      field: 'name',
      operator: IQueryOperatorEnum.Equals,
      value: 'John'
    };

    expect(filter).toBeDefined();
    expect(filter.field).toBe('name');
    expect(filter.operator).toBe(IQueryOperatorEnum.Equals);
    expect(filter.value).toBe('John');
  });

  test('ISuccessResponse should have correct properties', () => {
    const response: ISuccessResponse = {
      message: 'Success'
    };

    expect(response).toBeDefined();
    expect(response.message).toBe('Success');
  });

  test('ISortByEnum should have correct values', () => {
    expect(ISortByEnum.Asc).toBe('ASC');
    expect(ISortByEnum.Desc).toBe('DESC');
  });

});
