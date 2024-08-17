import { Module } from '@nestjs/common';
import { RoleModelEventsListener } from './listeners/role-model-events-listener.service';
import { RoleBackendServiceModule } from '@studiz/backend/role-service';
import { RoleResolver } from './resolvers/role.resolver';

@Module({
  imports: [RoleBackendServiceModule],
  providers: [RoleResolver, RoleModelEventsListener],
  exports: [],
})
export class RoleModule {}
