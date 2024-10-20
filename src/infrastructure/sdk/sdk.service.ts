import { HttpException, Injectable } from '@nestjs/common';
import { OpenapiService } from '../openapi/openapi.service';
import { HttpService } from '@nestjs/axios';
import { ClarezaLoggerService } from '@clareza/logger';
import { lastValueFrom } from 'rxjs';
import { SdkSupportedListReponseDto } from './dto/sdk-supported-list-reponse.dto';
import { validateOrReject } from 'class-validator';
import { SdkGeneratedLinkDto } from './dto/sdk-generated-link.dto';
import { plainToInstance } from 'class-transformer';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class SDKService {

  constructor(
    private loggerService: ClarezaLoggerService,
    private openApiService: OpenapiService,
    private httpService: HttpService
  ) { }

  /**
   * List of supported SDK
   * 
   */
  async supportedList(): Promise<SdkSupportedListReponseDto> {
    this.loggerService.setContext(this.supportedList.name);
    this.loggerService.log("executing");

    this.loggerService.verbose("get from open api");
    const response = await lastValueFrom(this.httpService.get('/clients'));

    this.loggerService.verbose("convert to DTO");
    const responseDto = plainToInstance(SdkSupportedListReponseDto, {
      list: response.data
    });

    this.loggerService.verbose("validate DTO");
    await validateOrReject(responseDto)

    this.loggerService.verbose("return a response");
    return responseDto;
  }

  /**
   * List of supported SDK
   * 
   */
  async optionsList(target: string): Promise<any> {
    this.loggerService.setContext(this.supportedList.name);
    this.loggerService.log("executing");

    this.loggerService.verbose("get from open api");
    const response = await lastValueFrom(this.httpService.get(`/clients/${target}`));

    this.loggerService.verbose("return a response");
    return response.data;
  }


  /**
   * Generate SDK
   * 
   */
  async generate(target: string, options: any): Promise<SdkGeneratedLinkDto> {
    this.loggerService.setContext(this.generate.name);
    this.loggerService.log("execute");

    this.loggerService.verbose("generate from open api");

    const response: AxiosResponse<SdkGeneratedLinkDto> =
      await lastValueFrom(this.httpService.post(`/clients/${target}`, {
        spec: this.openApiService.spec,
        options,
      })).catch((error: AxiosError) => {
        this.loggerService.error("fail to generate");
        throw new HttpException(error.message, error.status || 500)
      })

    this.loggerService.verbose("convert to DTO");
    const responseDto = plainToInstance(SdkGeneratedLinkDto, response.data);

    this.loggerService.verbose("validate DTO");
    await validateOrReject(responseDto)

    this.loggerService.verbose("return a response");
    return responseDto;
  }
}