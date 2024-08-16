import { DynamicModule, FactoryProvider, Logger, Module, ModuleMetadata } from '@nestjs/common';
import { PlatformManagerService } from './platform-manager.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PlatformManagerInterceptor } from './platform-manager.interceptor';

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
      module: PlatformManagerModule
    }
  }

  static forRoot(logger: Omit<FactoryProvider<any>, 'provide'> & Pick<ModuleMetadata, 'imports'>): DynamicModule{
    const { imports, ...provider } = options;

    return PlatformManagerModule.setupForRoot({
      imports,
      providers: [{
        provide: Logger,
        ...provider,
      }]
    })
  }
}
