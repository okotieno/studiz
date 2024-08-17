import { Module } from '@nestjs/common';
import { UserModelEventsListener } from './listeners/user-model-events-listener.service';
import { UserBackendServiceModule } from '@studiz/backend/user-service';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [UserBackendServiceModule],
  providers: [UserResolver, UserModelEventsListener],
  exports: [],
})
export class UserModule {}
