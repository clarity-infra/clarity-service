import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig, databaseconfig } from './database.config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forFeature(databaseconfig),
  ],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      async useFactory(config: ConfigService<DatabaseConfig>) {
        const options: DataSourceOptions = config.getOrThrow("datasource");
        const ds = new DataSource(options);

        return await ds.initialize();
      },
    }
  ]
})
export class DatabaseModule {}
