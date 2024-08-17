import { RoleModel } from '@studiz/backend/db';

export class RoleCreatedEvent {
  constructor(public role: RoleModel) {}
}
