import { IsInt } from 'class-validator';
import { UserModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class DeleteUserInputDto {
  @IsInt()
  @Exists(UserModel, 'id', {
    message: (validationArguments) =>
      `User with id  ${validationArguments.value}" not found`,
  })
  id = 0;
}
