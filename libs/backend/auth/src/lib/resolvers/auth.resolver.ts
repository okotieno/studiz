import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthServiceBackend } from '@studiz/backend/auth-service';
import { UserModel } from '@studiz/backend/db';
import { UnauthorizedException } from '@nestjs/common';
import { UserBackendService } from '@studiz/backend/user-service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthServiceBackend, private userService: UserBackendService) {
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
  async loginWithToken(
    @Args('token') token: string
  ) {
    const { email, type } = this.authService.validateToken(token);
    if (type === 'RefreshToken') {
      const user = await this.userService.findByEmail(email) as UserModel;
      return this.authService.login(user as UserModel);
    }
    throw new UnauthorizedException('Invalid token');
  }
}
