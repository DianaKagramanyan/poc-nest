import {IsEmail, IsNumber, IsString} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
