import { Module } from '@nestjs/common';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthServiceBackendModule } from '@studiz/backend/auth-service';
import { UserBackendServiceModule } from '@studiz/backend/user-service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PermissionBackendServiceModule } from '@studiz/backend/permission-service';
import { TranslationServiceModule } from '@studiz/backend/translation';
import { AuthEventsListener } from './listeners/auth.listener';
import { EmailModule } from '@studiz/backend/email-service';

@Module({
  imports: [
    AuthServiceBackendModule,
    UserBackendServiceModule,
    PermissionBackendServiceModule,
    TranslationServiceModule,
    EmailModule
  ],
  providers: [
    AuthResolver,
    JwtStrategy,
    AuthEventsListener
  ],
  exports: [],
})
export class AuthBackendModule {
}
