import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionInputDto {
  @IsString()
  @IsNotEmpty()
  name = '';
}
