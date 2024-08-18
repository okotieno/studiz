import { plural } from './plural';

describe('plural', () => {
  it('should add s', () => {
    expect(plural('plural')).toEqual('plurals');
  });

  it('should work for words ending in y', () => {
    expect(plural('country')).toEqual('countries');
  });
});
