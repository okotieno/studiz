import { UserModel } from '@studiz/backend/db';

export class UserCreatedEvent {
  constructor(public user: UserModel) {}
}
