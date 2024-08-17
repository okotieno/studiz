import { IsInt, ValidateNested } from 'class-validator';
import { CreateInstitutionRequestInputDto } from './create-institution-request-input.dto';
import { InstitutionRequestModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class UpdateInstitutionRequestInputDto {
  @IsInt()
  @Exists(InstitutionRequestModel, 'id', {
    message: (validationArguments) =>
      `InstitutionRequest with id  ${validationArguments.value}" not found`,
  })
  id = 0;

  @ValidateNested()
  params: CreateInstitutionRequestInputDto = { name: '' };
}
