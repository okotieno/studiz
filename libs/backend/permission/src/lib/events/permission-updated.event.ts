import { PermissionModel } from '@studiz/backend/db';

export class PermissionUpdatedEvent {
  constructor(public permission: PermissionModel) {}
}
