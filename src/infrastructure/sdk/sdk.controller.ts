import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SDKService } from './sdk.service';
import { Public } from 'src/auth/auth.decorator';
import { SdkSupportedListReponseDto } from './dto/sdk-supported-list-reponse.dto';
import { SdkGeneratedLinkDto } from './dto/sdk-generated-link.dto';
import { SdkGenerateRequestParamDto } from './dto/sdk-generate-request-param.dto';


/**
 * SDK Generator tool
 * 
 */
@Controller('sdk')
@ApiTags('Software Development Kit')
@ApiBearerAuth()
export class SDKController {
  constructor(private sdkService: SDKService) { }

  /**
   * Always-updated list of SDK that can be provided
   * 
   */
  @Get('supported-list')
  @Public()
  supportedList(): Promise<SdkSupportedListReponseDto> {
    return this.sdkService.supportedList();
  }


  /**
   * Get options for SDK request
   * 
   */
  @Get('generate-option/:target')
  @Public()
  getOption(@Param() params: SdkGenerateRequestParamDto): Promise<any> {
    return this.sdkService.optionsList(params.target);
  }

  /**
   * generate SDK that supported
   * 
   * **note:**
   * link / code only can be accessed at once, make sure downloader (the program) only hit the endpoint one time unless it 
   * will break the link
   */
  @Post('generate/:target')
  @Public()
  @ApiBody({
    schema: {},
    description: 'Options from endpoint generate-option'
  })
  generate(
    @Param() params: SdkGenerateRequestParamDto,
    @Body() options: any,
  ): Promise<SdkGeneratedLinkDto> {
    return this.sdkService.generate(params.target, options);
  }
}