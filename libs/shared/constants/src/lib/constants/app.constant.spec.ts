import { APP_NAME, GOOGLE_CLIENT_ID } from './app.constant';
import { TestBed } from '@angular/core/testing';

describe('Injection Tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_NAME, useValue: 'MyApp' },
        { provide: GOOGLE_CLIENT_ID, useValue: 'my-google-client-id' }
      ]
    });
  });

  it('should provide value for APP_NAME', () => {
    const appName = TestBed.inject(APP_NAME);
    expect(appName).toEqual('MyApp');
  });

  it('should provide value for GOOGLE_CLIENT_ID', () => {
    const googleClientId = TestBed.inject(GOOGLE_CLIENT_ID);
    expect(googleClientId).toEqual('my-google-client-id');
  });
});
