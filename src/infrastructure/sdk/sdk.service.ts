import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FileInfo,
  GenerateApiOutput,
  generateApi,
} from 'swagger-typescript-api';
import { SdkConfig } from './sdk.config';
import { OpenapiService } from '../openapi/openapi.service';

@Injectable()
export class SDKService {
  constructor(
    private configService: ConfigService<SdkConfig>,
    private openApiService: OpenapiService,
  ) { }

  private _output?: GenerateApiOutput;

  get fileName() {
    const name = this.configService.getOrThrow('className');

    return name.toLowerCase().replaceAll(' ', '-');
  }

  get className() {
    return this.configService.getOrThrow("className");
  }

  get file(): FileInfo | null {
    if (!this._output) return null;

    const file = this._output.files[0];

    file.fileContent = file.fileContent.replace(
      'export class Api<',
      `export class ${this.className}<`,
    );

    return {
      ...file,
      fileContent: `/* eslint-disable */\n/* tslint:disable */\n\n${file.fileContent}`,
    };
  }

  get fileOrThrow(): FileInfo {
    const file = this.file;

    if (!file) throw new InternalServerErrorException("expected file must be defined here");

    return file;
  }

  async make(): Promise<FileInfo> {
    if (this.file) return this.file;

    // TODO: somehow this bug, it was working
    const output = await generateApi({
      name: this.fileName,
      spec: this.openApiService.specOrThrow as any, // TODO: need to be fixed some type are missed
      httpClientType: 'axios',
      defaultResponseAsSuccess: true,
      extractEnums: false,
      defaultResponseType: 'void',
      extractResponseError: true,
      extractRequestBody: true,
      extractResponseBody: true,
      extractRequestParams: true,
      generateResponses: true,
    });

    this._output = output;

    return this.fileOrThrow;
  }
}