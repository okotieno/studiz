import { RoleModel } from '@studiz/backend/db';

export class RoleDeletedEvent {
  constructor(public role: RoleModel) {}
}
