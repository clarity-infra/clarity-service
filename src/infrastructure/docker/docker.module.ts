import { Module } from '@nestjs/common';
import { DockerModule as DockerModuleLibrary  } from '@clarity/docker';
import { DockerService } from './docker.service';
import { DockerConfig, dockerconfig } from './docker.config';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { DockerController } from './docker.controller';

@Module({
    imports: [
        DockerModuleLibrary.forRootAsync({
            imports: [
                ConfigModule.forFeature(dockerconfig)
            ],
            inject: [ConfigService],
            useFactory(config: ConfigService<DockerConfig>) {
                return {
                    socketPath: config.getOrThrow('socketPath')
                }
            },
        })
    ],
    providers: [DockerService],
    exports: [DockerService],
    controllers: [DockerController]
})
export class DockerModule {}
