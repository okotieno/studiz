import { IsInt, ValidateNested } from 'class-validator';
import { CreateInstitutionInputDto } from './create-institution-input.dto';
import { InstitutionModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

export class UpdateInstitutionInputDto {
  @IsInt()
  @Exists(InstitutionModel, 'id', {
    message: (validationArguments) =>
      `Institution with id  ${validationArguments.value}" not found`,
  })
  id = 0;

  @ValidateNested()
  params: CreateInstitutionInputDto = { name: '' };
}
