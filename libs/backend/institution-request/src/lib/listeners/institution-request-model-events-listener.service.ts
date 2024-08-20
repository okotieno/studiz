import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InstitutionRequestCreatedEvent } from '../events/institution-request-created.event';
import { WelcomeEmailService } from '@studiz/backend/email-service';

@Injectable()
export class InstitutionRequestModelEventsListener {
  constructor(private welcomeEmailService: WelcomeEmailService) {
  }
  @OnEvent('institution-request.created')
  async sendWelcomeEmail($event: InstitutionRequestCreatedEvent) {
    if($event.institutionRequest.adminEmail) {
      await this.welcomeEmailService.send({ to: $event.institutionRequest.adminEmail, slug: $event.institutionRequest.slug });
    }
  }
}
