import { ClassSerializerInterceptor, INestApplication, Module, NestApplicationOptions, OnModuleInit, Type, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DockerModule } from './docker/docker.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { OpenapiModule } from './openapi/openapi.module';
import { OpenapiService } from './openapi/openapi.service';
import { SDKModule } from './sdk/sdk.module';
import { APP_INTERCEPTOR, NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { PlatformModule } from './platform/platform.module';

declare const module: any;

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
export class InfrastructureModule{
  public static async CreateNestFactory(m: Type, options?: NestApplicationOptions) {
    const app = await NestFactory.create(m, options);

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    app.enableCors();

    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    const openApiService = app.get(OpenapiService);
    openApiService.setupFromApp(app)

    await app.listen(3000);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }
}
