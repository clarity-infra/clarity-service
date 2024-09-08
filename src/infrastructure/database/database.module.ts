import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, databaseconfig } from './database.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseService } from './database.service';
import { DatabaseCommand } from './database.command';
import { MigrationCommand } from './commands/migrations';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseconfig)],
      inject: [ConfigService],
      useFactory(configService: ConfigService<DatabaseConfig>) {
        const config: DatabaseConfig['datasource'] = {
          ...configService.getOrThrow('datasource'),
          autoLoadEntities: true,
        }
        
        return config
      },
    })
  ],
  providers: [DatabaseService, DatabaseCommand, MigrationCommand],
})
export class DatabaseModule {}
