import { DynamicModule, FactoryProvider, InternalServerErrorException, Module, ModuleMetadata } from '@nestjs/common';
import { DOCKER_TOKEN } from "./docker.enum"
import { Docker } from './docker.driver';

@Module({})
export class DockerModule {
  static register(
    options: Docker.DockerOptions & Pick<DynamicModule, 'global'>,
  ): DynamicModule {
    const setup = DockerModule.registrationSetup({
      providers: [
        {
          provide: DOCKER_TOKEN.CONFIG,
          useValue: options
        }
      ]
    })

    return setup
  }

  static registerAsync(
    options: Pick<
      FactoryProvider<Docker.DockerOptions>, 'useFactory'|'inject'> &
      Pick<ModuleMetadata, 'imports'> &
      Pick<DynamicModule, 'global'>
  ): DynamicModule {
    const { imports, ...provider } = options;

    const setup = DockerModule.registrationSetup({
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

  private static registrationSetup(
    module: ModuleMetadata & Pick<DynamicModule, 'global'>
  ): DynamicModule {
    if (!module.providers) module.providers = [];

    module.providers.push({
      provide: Docker,
      inject: [DOCKER_TOKEN.CONFIG],
      async useFactory(config: Docker.DockerOptions) {
        const docker = new Docker(config);

        await docker.version().catch((error: Error) => {
          throw new InternalServerErrorException(error, "can't connect to docker target")
        });

        return docker;
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
