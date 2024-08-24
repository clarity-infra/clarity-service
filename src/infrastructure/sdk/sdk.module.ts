import { Module } from '@nestjs/common';
import { SDKController } from './sdk.controller';
import { SDKService } from './sdk.service';
import { ConfigModule } from '@nestjs/config';
import { sdkconfig } from './sdk.config';
import { OpenapiModule } from '../openapi/openapi.module';

@Module({
  imports: [
    OpenapiModule,
    ConfigModule.forFeature(sdkconfig)
  ],
  controllers: [SDKController],
  providers: [SDKService]
})
export class SDKModule {}
