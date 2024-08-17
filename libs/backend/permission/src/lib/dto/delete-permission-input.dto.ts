import { IsInt } from 'class-validator';
import { PermissionModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class DeletePermissionInputDto {
  @IsInt()
  @Exists(PermissionModel, 'id', {
    message: (validationArguments) =>
      `Permission with id  ${validationArguments.value}" not found`,
  })
  id = 0;
}
