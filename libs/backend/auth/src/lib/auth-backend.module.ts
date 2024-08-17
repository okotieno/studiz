import { Module } from '@nestjs/common';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthServiceBackendModule } from '@studiz/backend/auth-service';
import { UserBackendServiceModule } from '@studiz/backend/user-service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PermissionBackendServiceModule } from '@studiz/backend/permission-service';

@Module({
  imports: [
    AuthServiceBackendModule,
    UserBackendServiceModule,
    PermissionBackendServiceModule
  ],
  providers: [
    AuthResolver,
    JwtStrategy
  ],
  exports: [],
})
export class AuthBackendModule {
}
