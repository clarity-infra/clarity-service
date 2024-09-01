import { ClassSerializerInterceptor, INestApplication, Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DockerModule } from './docker/docker.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { OpenapiModule } from './openapi/openapi.module';
import { OpenapiService } from './openapi/openapi.service';
import { SDKModule } from './sdk/sdk.module';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { PlatformModule } from './platform/platform.module';

@Module({
  imports: [
    PlatformModule,
    DockerModule,
    ConfigModule,
    DatabaseModule,
    LoggerModule,
    OpenapiModule,
    SDKModule,
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

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    this.openApiService.setupFromApp(app)

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  }
}
