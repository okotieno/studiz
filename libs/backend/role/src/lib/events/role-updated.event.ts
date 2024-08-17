import { RoleModel } from '@studiz/backend/db';

export class RoleUpdatedEvent {
  constructor(public role: RoleModel) {}
}
