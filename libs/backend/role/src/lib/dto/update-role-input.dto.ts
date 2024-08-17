import { IsInt, ValidateNested } from 'class-validator';
import { CreateRoleInputDto } from './create-role-input.dto';
import { RoleModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class UpdateRoleInputDto {
  @IsInt()
  @Exists(RoleModel, 'id', {
    message: (validationArguments) =>
      `Role with id  ${validationArguments.value}" not found`,
  })
  id = 0;

  @ValidateNested()
  params: CreateRoleInputDto = { name: '' };
}
