import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ServiceException {
  @ApiProperty({
    readOnly: true,
    description: "Friendly and readable service feedback"
  })
  message!: string;

  @ApiProperty({
    readOnly: true,
    description: "Error identifier"
  })
  error!: string;

  @ApiProperty(
    {
      enum: () => {
        return Object.values(HttpStatus).filter((status) => {
          if (typeof status !== 'number') return;

          return status >= 400 && status < 600;
        })
      },
      readOnly: true,
      description: "Like what you see at http header, but it's on body"
    }
  )
  statusCode!: HttpStatus;
}