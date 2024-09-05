import { IsEmail, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { FileUploadModel, InstitutionRequestModel } from '@studiz/backend/db';
import { Exists } from '@studiz/backend/validators';

class LogoFileUploadInputDTO {
  @IsInt()
  @Exists(FileUploadModel, 'id', {
    message: (validationArguments) =>
      `File with id  ${validationArguments.value}" not found`,
  })
  id = 0;
}

class AdminInfoDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string
}

class InstitutionInfoDto {
  @IsString()
  @IsOptional()
  name?: string


  @ValidateNested()
  logoFileUpload?: LogoFileUploadInputDTO
}


export class InstitutionRequestProgressInputDto {
  @ValidateNested()
  institutionInfo?: InstitutionInfoDto

  @ValidateNested({ each: true })
  adminInfos?: AdminInfoDto[]
}
export class UpdateInstitutionRequestProgressInputDto {
  @IsInt()
  @Exists(InstitutionRequestModel, 'id', {
    message: (validationArguments) =>
      `InstitutionRequest with id  ${validationArguments.value}" not found`,
  })
  id = 0;

  @ValidateNested()
  params: InstitutionRequestProgressInputDto = { };
}
