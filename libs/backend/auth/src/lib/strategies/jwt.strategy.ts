import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UserBackendService } from '@studiz/backend/user-service';

interface JWTPayload {
  email: string;
  sub: number;
  type: 'RefreshToken' | 'AuthToken',
  iat: 1715327379,
  exp: 1715932179
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('JWT_SECRET') jwtSecret: string, private userService: UserBackendService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: JWTPayload) {
    const permissions = await this.userService.getUserPermissions(payload.email);
    if(payload.type === 'AuthToken') {

      return { id: payload.sub, username: payload.email, permissions: permissions.map(({name}) => name) };
    }
    return false;
  }
}
