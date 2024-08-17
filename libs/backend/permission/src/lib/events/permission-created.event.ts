import { PermissionModel } from '@studiz/backend/db';

export class PermissionCreatedEvent {
  constructor(public permission: PermissionModel) {}
}
