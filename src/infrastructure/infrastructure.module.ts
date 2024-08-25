import { ClassSerializerInterceptor, INestApplication, InternalServerErrorException, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DockerModule } from './docker/docker.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { PlatformManagerModule } from '@clarity/platform-manager';
import { OpenapiModule } from './openapi/openapi.module';
import { OpenapiService } from './openapi/openapi.service';
import { SDKModule } from './sdk/sdk.module';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';

@Module({
    imports: [
        PlatformManagerModule.forRoot({}),
        DockerModule,
        ConfigModule,
        DatabaseModule,
        LoggerModule,
        OpenapiModule,
        SDKModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ]
})
export class InfrastructureModule implements OnModuleInit {
  private static _NestApp: INestApplication;

  public static set NestApp(app: INestApplication) {
    InfrastructureModule._NestApp = app;
  }

  constructor(
    private openApiService: OpenapiService
  ) {  }

  onModuleInit() {
    const app = InfrastructureModule._NestApp;

    this.openApiService.setupFromApp(app)

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  }
}
