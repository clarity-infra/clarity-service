import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class AuthLoginRequestDto {

  /**
   * this usually like username
   * 
   * @example admin
   */
  @IsString()
  @IsDefined()
  identifier!: string;
  
  /**
   * usual password
   * 
   * @example qwerty12345
   */
  @IsString()
  @IsDefined()
  password!: string;
}