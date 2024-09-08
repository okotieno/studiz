import { IsInt } from 'class-validator';
import { InstitutionRequestModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class CompleteInstitutionRequestInputDto {
  @IsInt()
  @Exists(InstitutionRequestModel, 'id', {
    message: (validationArguments) => {
      return `InstitutionRequest with id  ${validationArguments.value}" not found`
    }
  })
  id = 0;

}
