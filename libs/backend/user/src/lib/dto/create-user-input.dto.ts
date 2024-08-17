import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInputDto {
  @IsString()
  @IsNotEmpty()
  name = '';
}
