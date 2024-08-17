import { Module } from '@nestjs/common';
import { PermissionModelEventsListener } from './listeners/permission-model-events-listener.service';
import { PermissionBackendServiceModule } from '@studiz/backend/permission-service';
import { PermissionResolver } from './resolvers/permission.resolver';

@Module({
  imports: [PermissionBackendServiceModule],
  providers: [PermissionResolver, PermissionModelEventsListener],
  exports: [],
})
export class PermissionModule {}
