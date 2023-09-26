import { IsArray, IsNumber} from "class-validator";

export class UpdateUserDto {
  @IsArray()
  favoriteFoods: string[];

  @IsNumber()
  age: number;
}
