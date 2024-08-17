import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RoleCreatedEvent } from '../events/role-created.event';

@Injectable()
export class RoleModelEventsListener {
  @OnEvent('role.created')
  async handleRoleCreated($event: RoleCreatedEvent) {
    // console.log($event)
  }
}
