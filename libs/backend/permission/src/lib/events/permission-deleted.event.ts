import { PermissionModel } from '@studiz/backend/db';

export class PermissionDeletedEvent {
  constructor(public permission: PermissionModel) {}
}
