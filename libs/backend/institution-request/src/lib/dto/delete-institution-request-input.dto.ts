import { IsInt } from 'class-validator';
import { InstitutionRequestModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class DeleteInstitutionRequestInputDto {
  @IsInt()
  @Exists(InstitutionRequestModel, 'id', {
    message: (validationArguments) =>
      `InstitutionRequest with id  ${validationArguments.value}" not found`,
  })
  id = 0;
}
