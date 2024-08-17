import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PermissionCreatedEvent } from '../events/permission-created.event';

@Injectable()
export class PermissionModelEventsListener {
  @OnEvent('permission.created')
  async handlePermissionCreated($event: PermissionCreatedEvent) {
    // console.log($event)
  }
}
