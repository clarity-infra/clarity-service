import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class SdkGeneratedLinkDto {
  @IsNotEmpty()
  @IsString()
  code!: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link!: string;

  constructor(initializer: SdkGeneratedLinkDto) {
    Object.assign(this, initializer);
  }
}