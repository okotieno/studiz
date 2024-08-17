import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InstitutionRequestCreatedEvent } from '../events/institution-request-created.event';

@Injectable()
export class InstitutionRequestModelEventsListener {
  @OnEvent('institution-request.created')
  async handleInstitutionRequestCreated(
    $event: InstitutionRequestCreatedEvent
  ) {
    // console.log($event)
  }
}
