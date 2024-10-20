import { IsString } from "class-validator";

export class SdkGenerateRequestParamDto {
  /**
   * target is a valid list from supported-list endpoint
   */
  @IsString()
  target!: string
}