import { Module } from '@nestjs/common';
import { DockerModule as DockerModuleLibrary  } from '@clareza/docker';
import { DockerService } from './docker.service';
import { DockerConfig, dockerconfig } from './docker.config';
import { ConfigService, ConfigModule } from '@nestjs/config';

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
    exports: [DockerService]
})
export class DockerModule {}
