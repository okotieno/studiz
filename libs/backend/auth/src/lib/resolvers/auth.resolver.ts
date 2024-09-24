import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthServiceBackend } from '@studiz/backend/auth-service';
import { UserModel } from '@studiz/backend/db';
import { UnauthorizedException } from '@nestjs/common';
import { UserBackendService } from '@studiz/backend/user-service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TranslationService } from '@studiz/backend/translation';
import { LoginLinkRequestEvent } from '../events/login-link-request.event';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthServiceBackend,
    private userService: UserBackendService,
    private eventEmitter: EventEmitter2,
    private translationService: TranslationService
  ) {
  }

  @Mutation()
  async signInWithGoogle(
    @Args('token') token: string
  ) {
    const user = await this.authService.signInGoogleUser(token);
    if (!user) {
      return null;
    }
    return this.authService.login(user);
  }

  @Mutation()
  async requestAccessToken(
    @Args('refreshToken') refreshToken: string
  ) {
    const { email, userId } = this.authService.validateToken(refreshToken);
    const user = await this.userService.findByEmail(email, { id: userId });
    return this.authService.login(user as UserModel);
  }

  @Mutation()
  async requestLoginLink(
    @Args('email') email: string
  ) {
    this.eventEmitter.emit(
      'login-link.request',
      new LoginLinkRequestEvent(email)
    );

    return {
      message: this.translationService.getTranslation('alert.auth.loginLinkRequest')
    };
  }

  @Mutation()
  async loginWithToken(
    @Args('token') token: string
  ) {
    const { email, type } = this.authService.validateToken(token);
    if (['RefreshToken', 'LoginToken'].includes(type)) {
      const user = await this.userService.findByEmail(email) as UserModel;
      return this.authService.login(user as UserModel);
    }
    throw new UnauthorizedException('Invalid token');

  }
}
