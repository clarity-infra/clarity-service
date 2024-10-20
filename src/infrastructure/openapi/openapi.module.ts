import { Module } from '@nestjs/common';
import { OpenapiService } from './openapi.service';
import { ConfigModule } from '@nestjs/config';
import { openapiconfig } from './openapi.config';

@Module({
  imports: [
    ConfigModule.forFeature(openapiconfig)
  ],
  providers: [OpenapiService],
  exports: [OpenapiService]
})
export class OpenapiModule {

  
}
