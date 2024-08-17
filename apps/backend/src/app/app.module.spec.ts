import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

jest.mock('@studiz/db-backend', () => ({
  DbModule: class DbModuleMock {},
}));

jest.mock('nestjs-i18n', () => {
  class HeaderResolverMock {
    resolve = jest.fn();
  }
  class ForRoot {}
  return {
    I18nModule: class I18nModuleMock {
      static forRoot() {
        return ForRoot;
      }
    },
    HeaderResolver: HeaderResolverMock,
  };
});

describe('AppModule', () => {
  let app: TestingModule;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
