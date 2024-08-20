import { Module } from '@nestjs/common';
import { InstitutionRequestModelEventsListener } from './listeners/institution-request-model-events-listener.service';
import { InstitutionRequestBackendServiceModule } from '@studiz/backend/institution-request-service';
import { InstitutionRequestResolver } from './resolvers/institution-request.resolver';
import { TranslationServiceModule } from '@studiz/backend/translation';
import { EmailModule } from '@studiz/backend/email-service';

@Module({
  imports: [
    InstitutionRequestBackendServiceModule,
    TranslationServiceModule,
    EmailModule
  ],
  providers: [
    InstitutionRequestResolver,
    InstitutionRequestModelEventsListener,
  ],
  exports: [],
})
export class InstitutionRequestModule {}
