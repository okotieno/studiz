import { UserModel } from '@studiz/backend/db';

export class UserUpdatedEvent {
  constructor(public user: UserModel) {}
}
