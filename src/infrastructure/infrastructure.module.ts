import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DockerModule } from './docker/docker.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { PlatformManagerModule } from '@clarity/platform-manager';

@Module({
    imports: [
        PlatformManagerModule.forRoot({}),
        DockerModule,
        ConfigModule,
        DatabaseModule,
        LoggerModule
    ]
})
export class InfrastructureModule {}
