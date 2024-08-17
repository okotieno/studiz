import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleInputDto {
  @IsString()
  @IsNotEmpty()
  name = '';
}
