import { UserModel } from '@studiz/backend/db';

export class UserDeletedEvent {
  constructor(public user: UserModel) {}
}
