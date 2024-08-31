import { ClassProvider, DynamicModule, FactoryProvider, Inject, Logger, MiddlewareConsumer, Module, ModuleMetadata, NestModule, Scope } from '@nestjs/common';
import { PlatformManagerService } from './platform-manager.service';
import { INQUIRER } from '@nestjs/core';
import { PM_TOKEN } from './platform-manager.token';
import { PlatformManagerState } from './platform-manager.state';

@Module({
  providers: [
    PlatformManagerService
  ],
  exports: [PlatformManagerService],
})
export class PlatformManagerModule implements NestModule {
  private static setupForRoot(module: ModuleMetadata): DynamicModule {
    return {
      ...module,
      module: PlatformManagerModule,
    }
  }

  static forRoot(options?:
    {
      logger?: Omit<FactoryProvider<any>, 'provide'> | Omit<ClassProvider<any>, 'provide'>
    } &
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

  constructor(
    private pm: PlatformManagerService,

    @Inject(PM_TOKEN.LOGGER)
    private logger: Logger
  ) { }

  configure(consumer: MiddlewareConsumer) {
    // NOTE: only support express and fastify with a bit adjustment on it
    //
    //
    consumer
      .apply((req: any, res: any, next: any) => {
        const store = new PlatformManagerState({
          request: req,
          response: res
        });

        return this.pm.initPlatformScope(store, () => next());
      })
      .forRoutes('*');
  }
}
