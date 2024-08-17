import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthServiceBackend } from '@studiz/backend/auth-service';
import { UserBackendService } from '@studiz/backend/user-service';

const authServiceMock = {
  signInGoogleUser: jest.fn(),
  login: jest.fn()
};

const userServiceMock = {

};
describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthServiceBackend;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthServiceBackend,
          useValue: authServiceMock
        },
        {
          provide: UserBackendService,
          useValue: userServiceMock
        }
      ]
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthServiceBackend>(AuthServiceBackend);
  });

  it('should sign in with Google and return user', async () => {
    const user = { id: '1', name: 'John Doe' };
    const token = 'some_google_token';

    authServiceMock.signInGoogleUser.mockResolvedValueOnce(user);
    authServiceMock.login.mockReturnValueOnce('some_auth_token');

    const result = await resolver.signInWithGoogle(token);

    expect(authService.signInGoogleUser).toHaveBeenCalledWith(token);
    expect(authService.login).toHaveBeenCalledWith(user);
    expect(result).toEqual('some_auth_token');
  });

  it('should return null if user is not found', async () => {
    const token = 'some_google_token';

    authServiceMock.signInGoogleUser.mockResolvedValueOnce(null);

    const result = await resolver.signInWithGoogle(token);

    expect(authService.signInGoogleUser).toHaveBeenCalledWith(token);
    expect(result).toBeNull();
  });
});
