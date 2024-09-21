import { HttpStatus } from "@nestjs/common";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { ServiceException } from "./http-exception.model";
/**
 * This abstract only for OpenAPI and should not to be extended
 * 
 */
export abstract class ServiceUnprocessableEntityException extends ServiceException {
  @ApiProperty({ default: HttpStatus.UNPROCESSABLE_ENTITY })
  statusCode: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;

  @ApiProperty({
    isArray: true,
    description: "This spesific error feedback like 'which data that we can't processed'"
  })
  details!: Array<any>;
}