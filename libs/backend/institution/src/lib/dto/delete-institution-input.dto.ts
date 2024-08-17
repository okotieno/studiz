import { IsInt } from 'class-validator';
import { InstitutionModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class DeleteInstitutionInputDto {
  @IsInt()
  @Exists(InstitutionModel, 'id', {
    message: (validationArguments) =>
      `Institution with id  ${validationArguments.value}" not found`,
  })
  id = 0;
}
