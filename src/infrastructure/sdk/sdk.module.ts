import { Module } from '@nestjs/common';
import { SDKController } from './sdk.controller';
import { SDKService } from './sdk.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SdkConfig, sdkconfig } from './sdk.config';
import { OpenapiModule } from '../openapi/openapi.module';
import { HttpModule } from '@nestjs/axios';
import { ClarezaLoggerService } from '@clareza/logger';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(sdkconfig)],
      inject: [ConfigService, ClarezaLoggerService],
      useFactory(config: ConfigService<SdkConfig>, logger: ClarezaLoggerService) {
        logger.log("prepare http module with factory");

        logger.verbose("prepare config(s)");
        const baseUrl = config.getOrThrow('openApiUrl');

        logger.verbose("return config(s)");
        return {
          baseURL: baseUrl, 
          beforeRedirect(options, responseDetails) {
            logger.warn("open api redirect system to other place");
            logger.verbose(responseDetails);
          },
        }
      },
    }),
    OpenapiModule,
    ConfigModule.forFeature(sdkconfig)
  ],
  controllers: [SDKController],
  providers: [SDKService]
})
export class SDKModule {}
