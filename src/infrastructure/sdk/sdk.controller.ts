import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SDKService } from './sdk.service';
import { Response } from 'express';

@Controller('sdk')
@ApiTags('Software Development Kit')
export class SDKController {
  constructor(private sdkService: SDKService) { }

  @Get('download/typescript')
  @ApiOperation({
    description:
      'developer can download this SDK that up to date and ready-to-dev SDK file, <b>this sdk require axios</b> if you need make this no axios required, you can request this SDK to be native Node Fetch **for native Fetch support, please contact maintainer**',
    summary:
      'Typescript SDK',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ready-to-dev typescript SDK file',
  })
  async download(@Res() res: Response) {
    const { fileContent, fileExtension, fileName } = await this.sdkService.make();

    res.set({
      'Content-Type': 'application/text',
      'Content-Disposition': `attachment; filename="${fileName}${fileExtension}"`,
    });

    return res.send(fileContent);
  }
}