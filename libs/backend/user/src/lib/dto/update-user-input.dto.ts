import { IsInt, ValidateNested } from 'class-validator';
import { CreateUserInputDto } from './create-user-input.dto';
import { UserModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class UpdateUserInputDto {
  @IsInt()
  @Exists(UserModel, 'id', {
    message: (validationArguments) =>
      `User with id  ${validationArguments.value}" not found`,
  })
  id = 0;

  @ValidateNested()
  params: CreateUserInputDto = { name: '' };
}
