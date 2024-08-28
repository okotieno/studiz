import { IsString } from 'class-validator';
import { InstitutionRequestModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class CompleteInstitutionRequestInputDto {
  // @IsString()
  @Exists(InstitutionRequestModel, 'slug', {
    message: (validationArguments) => {
      return `InstitutionRequest with id  ${validationArguments.value}" not found`
    }

  })
  id = 0;

}
