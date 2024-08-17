import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstitutionRequestInputDto {
  @IsString()
  @IsNotEmpty()
  name = '';
}
