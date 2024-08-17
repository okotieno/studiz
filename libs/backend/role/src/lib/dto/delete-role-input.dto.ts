import { IsInt } from 'class-validator';
import { RoleModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class DeleteRoleInputDto {
  @IsInt()
  @Exists(RoleModel, 'id', {
    message: (validationArguments) =>
      `Role with id  ${validationArguments.value}" not found`,
  })
  id = 0;
}
