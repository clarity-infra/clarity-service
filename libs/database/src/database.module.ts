import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseInterceptor } from './database.interceptor';
import { DatabaseAsyncStorage } from './database.async-storage';
import { DatabaseConnection } from './database.connection';
import { DataSource, EntityTarget } from 'typeorm';
import { DatabaseAsyncOptions, DatabaseOptions } from './database.interface';
import { DefaultDatabaseStrategy } from './strategies/default.database-strategy';
import { DATABASE_CONFIG, STRATEGIES_TOKEN } from './database.constants';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DatabaseInterceptor,
    },
    DatabaseAsyncStorage,
  ],
  exports: [DatabaseConnection, DatabaseAsyncStorage],
})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions = {
    datasources: [],
  }): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DATABASE_CONFIG,
          useValue: options
        },
        {
          provide: STRATEGIES_TOKEN,
          useClass: options.strategy || DefaultDatabaseStrategy
        },
        {
          provide: DatabaseConnection,
          inject: [DatabaseAsyncStorage, DATABASE_CONFIG],
          async useFactory(asyncStorage: DatabaseAsyncStorage, options: DatabaseOptions) {
            const provider = new DatabaseConnection(asyncStorage);

            if (options.datasources) {
              const initials = options.datasources.map(async (options) => {
                return provider.addDatasource(options.name, new DataSource(options.datasource))
              })

              await Promise.all(initials)
            }

            return provider;
          },
        },
        DatabaseAsyncStorage,
      ],
    };
  }

  static forRootAsync(
    options: DatabaseAsyncOptions,
  ): DynamicModule {
    const { imports, strategy, ...configProvider } = options

    return {
      imports: imports,
      providers: [
        {
          ...configProvider,
          provide: DATABASE_CONFIG,
        }
      ],
      ...DatabaseModule.forRoot({
        strategy: strategy
      })
    }
  }

  static forFeature(...entities: EntityTarget<any>[]): DynamicModule {
    return {
      module: DatabaseModule,
    };
  }
}
