import {IsEmail, IsNumber} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNumber()
  age: number;
}
