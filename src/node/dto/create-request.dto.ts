import { IsNotEmpty, IsString } from "class-validator";

export class CreateNodeRequestDto {
  @IsNotEmpty()
  @IsString()
  name!: string;
}