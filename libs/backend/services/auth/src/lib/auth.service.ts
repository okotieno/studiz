import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { UserModel } from '@studiz/backend/db';
import { UserBackendService } from '@studiz/backend/user-service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  saltOrRounds = 10;
  private oauthClient?: Auth.OAuth2Client = new google.auth.OAuth2(
    process.env?.['STUDIZ_GOOGLE_CLIENT_ID'] ?? '',
    process.env?.['STUDIZ_GOOGLE_CLIENT_SECRET'] ?? ''
  );
  private accessTokenExpiryPeriod = process.env?.['STUDIZ_EXPIRY_PERIOD_ACCESS_TOKEN'] ?? '300s';
  private refreshTokenExpiryPeriod = process.env?.['STUDIZ_EXPIRY_PERIOD_REFRESH_TOKEN'] ?? '7d';

  constructor(
    @Inject('JWT_SECRET') private jwtSecret: string,
    private userService: UserBackendService, private jwtService: JwtService) {
  }

  async signInGoogleUser(
    idToken: string
  ): Promise<UserModel | null> {
    const tokenInfo = await this.oauthClient?.verifyIdToken({
      idToken
    });
    const payload = tokenInfo?.getPayload();
    if (payload && payload.email) {
      const user = await this.userService.findByEmail(tokenInfo?.getPayload()?.email ?? '');
      if (!user) {
        throw new BadRequestException(`No user found with email ${payload.email}`)
      }
      return user;

    } else {
      return null;
    }
  }

  async login(user: UserModel | null, expiresIn = this.accessTokenExpiryPeriod) {
    if (!user) {
      return;
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    // const userDetails = await this.userService.findById(user.id);
    return {
      user: user,
      accessToken: this.jwtService.sign({ ...payload, type: 'AuthToken' }, { expiresIn }),
      refreshToken: this.jwtService.sign({ ...payload, type: 'RefreshToken' }, { expiresIn: this.refreshTokenExpiryPeriod }),
      refreshTokenKey: uuid()
    };
  }

  validateToken(token: string) {
    try {
      const decoded = verify(token, this.jwtSecret) as JwtPayload;
      return {
        userId: decoded['sub'],
        email: decoded['email'],
        type: decoded['type'],
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
