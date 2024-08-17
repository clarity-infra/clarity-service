import { ClassProvider, DynamicModule, FactoryProvider, Logger, Module, ModuleMetadata, Scope } from '@nestjs/common';
import { PlatformManagerService } from './platform-manager.service';
import { APP_INTERCEPTOR, INQUIRER } from '@nestjs/core';
import { PlatformManagerInterceptor } from './platform-manager.interceptor';
import { PM_TOKEN } from './platform-manager.token';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PlatformManagerInterceptor
    },
    PlatformManagerService
  ],
  exports: [PlatformManagerService],
})
export class PlatformManagerModule {
  private static setupForRoot(module: ModuleMetadata): DynamicModule {
    return {
      ...module,
      module: PlatformManagerModule
    }
  }

  static forRoot(options?:
    { logger?: Omit<FactoryProvider<any>, 'provide'> | Omit<ClassProvider<any>, 'provide'> } &
    Pick<ModuleMetadata, 'imports'>
  ): DynamicModule {
    // still pass object
    if (!options) options = {}

    // default logger
    if (!options?.logger) {
      options.logger = {
        inject: [INQUIRER],
        scope: Scope.TRANSIENT,
        useFactory(parentClass: object) {
          return new Logger(parentClass?.constructor?.name)
        },
      }
    }

    // install for root
    return PlatformManagerModule.setupForRoot({
      imports: options.imports,
      providers: [{
        provide: PM_TOKEN.LOGGER,
        ...options.logger,
      }]
    })
  }
}
