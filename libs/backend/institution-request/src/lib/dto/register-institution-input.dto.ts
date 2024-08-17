import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterInstitutionInputDto {
  @IsString()
  @IsNotEmpty()
  institutionName = '';

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  adminEmail = '';
}
