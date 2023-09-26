import { IsArray, IsNumber, IsOptional} from "class-validator";

export class UpdateUserDto {
  @IsArray()
  @IsOptional()
  favoriteFoods: string[];

  @IsNumber()
  @IsOptional()
  age: number;
}
