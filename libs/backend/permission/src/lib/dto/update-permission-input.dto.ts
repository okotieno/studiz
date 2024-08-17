import { IsInt, ValidateNested } from 'class-validator';
import { CreatePermissionInputDto } from './create-permission-input.dto';
import { PermissionModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class UpdatePermissionInputDto {
  @IsInt()
  @Exists(PermissionModel, 'id', {
    message: (validationArguments) =>
      `Permission with id  ${validationArguments.value}" not found`,
  })
  id = 0;

  @ValidateNested()
  params: CreatePermissionInputDto = { name: '' };
}
