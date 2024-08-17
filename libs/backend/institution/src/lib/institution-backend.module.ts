import { Module } from '@nestjs/common';
import { InstitutionModelEventsListener } from './listeners/institution-model-events-listener.service';
import { InstitutionBackendServiceModule } from '@studiz/backend/institution-service';
import { InstitutionResolver } from './resolvers/institution.resolver';

@Module({
  imports: [InstitutionBackendServiceModule],
  providers: [InstitutionResolver, InstitutionModelEventsListener],
  exports: [],
})
export class InstitutionModule {}
