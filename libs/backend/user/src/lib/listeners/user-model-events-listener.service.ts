import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class UserModelEventsListener {
  @OnEvent('user.created')
  async handleUserCreated($event: UserCreatedEvent) {
    // console.log($event)
  }
}
