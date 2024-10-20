import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SdkSupportedListReponseDto {
  @IsNotEmpty()
  @IsString({ each: true })
  list!: string[];

  constructor(initializer: SdkSupportedListReponseDto) {
    Object.assign(this, initializer)
  }
}