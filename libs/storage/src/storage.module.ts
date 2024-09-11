import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { StorageService } from './storage.service';

interface DiskOptions {
  name: string
}

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {
  private static disks = new Map<DiskOptions['name'], any>();

  private static setup(
    module: ModuleMetadata & Pick<DynamicModule, 'global'>
  ): DynamicModule {
    if (!module.providers) module.providers = [];

    const setup: DynamicModule = Object.assign(module, {
      module: this,
    });

    return setup;
  }

  private static attachGlobalDisk(options: DiskOptions): DynamicModule {
    return {
      module: StorageModule,
      global: options.global
    }
  }

  static attachDisk(
    options: DiskOptions & Pick<DynamicModule, 'global'>
  ): DynamicModule {
    if (options.global) {
      this.attachGlobalDisk(options);
    }

    return {
      module: StorageModule,
      global: options.global
    }
  }

  private static registrationSetup(
    module: ModuleMetadata & Pick<DynamicModule, 'global'>
  ): DynamicModule {
    if (!module.providers) module.providers = [];

    module.providers.push({
      provide: StorageService,
      async useFactory(config: any) {

      },
    })

    module.exports = [Docker]

    const setup: DynamicModule = Object.assign(module, {
      module: DockerModule,
      global: true,
    })

    return setup
  }
}
