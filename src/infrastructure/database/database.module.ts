import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, databaseconfig } from './database.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DatabaseService } from './database.service';
import { DatabaseCommand } from './database.command';
import { DatabaseMigrationCommand } from './commands/migration';
import { DatabaseMigrationUpCommand } from './commands/migration/up';
import { Migrator } from '@mikro-orm/migrations';
import { DatabaseMigrationCreateCommand } from './commands/migration/create';
import { resolve } from 'path';
import { Migration20240922151351_NodeTableCreation } from './migrations/20240922151351_NodeTableCreation';
import { DatabaseMigrationDownCommand } from './commands/migration/down';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseconfig)],
      inject: [ConfigService],
      useFactory(configService: ConfigService<DatabaseConfig>) {
        const config: DatabaseConfig['datasource'] = {
          ...configService.getOrThrow('datasource'),
          
          extensions: [Migrator],

          autoLoadEntities: true,

          migrations: {
            tableName: '_migration',

            // TODO: must be automatically loaded, this because we use HRM Webpack
            migrationsList: [
              {
                name: Migration20240922151351_NodeTableCreation.name,
                class: Migration20240922151351_NodeTableCreation
              }
            ],

            fileName: (timestamp: string, name?: string) => {
              return `${timestamp}_${name ?? 'unknown'}`;
            },
          }
        }
        
        return config
      },
    })
  ],
  providers: [
    // Commaders
    DatabaseCommand,
    DatabaseMigrationCommand,
    DatabaseMigrationUpCommand,
    DatabaseMigrationCreateCommand,
    DatabaseMigrationDownCommand,

    // Services
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
