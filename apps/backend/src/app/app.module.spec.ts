import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './app.module';

import { PermissionModule } from '@studiz/backend/permission';

import { UserModule } from '@studiz/backend/user-backend';
import { RoleModule } from '@studiz/backend/role';

jest.mock('@studiz/backend/db', () => ({
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

jest.mock('@studiz/backend/permission', () => ({
  PermissionModule: class PermissionModuleMock {},
}));

jest.mock('@studiz/backend/user-backend', () => ({
  UserModule: class UserModuleMock {},
}));

jest.mock('@studiz/backend/role-backend', () => ({
  RoleModule: class RoleModuleMock {},
}));

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

  it('should inject PermissionModule', () => {
    const permissionModule = app.get<PermissionModule>(PermissionModule);
    expect(permissionModule).toBeDefined();
  });

  it('should inject UserModule', () => {
    const userModule = app.get<UserModule>(UserModule);
    expect(userModule).toBeDefined();
  });

  it('should inject RoleModule', () => {
    const roleModule = app.get<RoleModule>(RoleModule);
    expect(roleModule).toBeDefined();
  });
});
