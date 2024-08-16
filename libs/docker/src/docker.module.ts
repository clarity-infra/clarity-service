import { DynamicModule, FactoryProvider, Module, ModuleMetadata } from '@nestjs/common';
import { DOCKER_TOKEN } from "./docker.enum"
import { Docker } from './docker.driver';

@Module({})
export class DockerModule {
  private static setupForRoot(module: ModuleMetadata): DynamicModule {
    if(!module.providers) module.providers = [];
    
    module.providers.push({
      provide: Docker,
      inject:[DOCKER_TOKEN.CONFIG],
      useFactory(config: Docker.DockerOptions) {
        return new Docker(config);
      },
    })

    module.exports = [
      Docker
    ] 

    const setup: DynamicModule = Object.assign(module, {
      module: DockerModule,
      global: true,
    })

    return setup
  }

  static forRoot(options: Docker.DockerOptions): DynamicModule {
    const setup = DockerModule.setupForRoot({
      providers: [
        {
          provide: DOCKER_TOKEN.CONFIG,
          useValue: options
        }
      ]
    })

    return setup
  }

  static forRootAsync(
    options: Omit<FactoryProvider<Docker.DockerOptions>, 'provide'> & Pick<ModuleMetadata, 'imports'>
  ): DynamicModule {
    const { imports, ...provider } = options;

    const setup = DockerModule.setupForRoot({
      imports,
      providers: [
        {
          provide: DOCKER_TOKEN.CONFIG,
          ...provider,
        }
      ]
    });

    return setup;
  }
}
