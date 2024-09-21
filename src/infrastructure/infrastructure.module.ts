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
  ]
})
export class InfrastructureModule{
  public static async CreateNestFactory(m: Type, options?: NestApplicationOptions) {
    const app = await NestFactory.create(m, options);

    /**
     * Class Serializer Interceptor
     * 
     * to make sure DTO **response** always be convert to class and be transformed and validated
     */
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    /**
     * Class Validator Pipe
     * 
     * to make sure DTO **request** always be convert to class and be transformed and validated
     */
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    /**
     * Open Api Setup
     * 
     * Well Automated Documentation
     */
    const openApiService = app.get(OpenapiService);
    openApiService.setupFromApp(app)

    /**
     * Serve App
     * 
     */
    app.enableCors();
    await app.listen(3000);

    /**
     * Hot Reload Mechanism
     * 
     */
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }
}
