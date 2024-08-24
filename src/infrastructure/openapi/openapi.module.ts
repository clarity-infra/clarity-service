import { Module } from '@nestjs/common';
import { OpenapiService } from './openapi.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { openapiconfig } from './openapi.config';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forFeature(openapiconfig)
  ],
  providers: [OpenapiService],
  exports: [OpenapiService]
})
export class OpenapiModule {

  
}
