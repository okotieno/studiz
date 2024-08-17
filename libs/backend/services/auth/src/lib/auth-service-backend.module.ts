import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserBackendServiceModule } from '@studiz/backend/user-service';
import { jwtSecretProvider } from './providers/jwt-secret.provider';

@Module({
  imports: [
    UserBackendServiceModule,
    JwtModule.register({
      secret: String(process.env['STUDIZ_JWT_SECRET']),
      signOptions: { expiresIn: '15s' }
    }),
  ],
  providers: [
    AuthService, jwtSecretProvider
  ],
  exports: [AuthService, jwtSecretProvider],
})
export class AuthServiceBackendModule {
}
