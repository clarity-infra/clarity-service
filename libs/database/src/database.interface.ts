import { ClassProvider, FactoryProvider, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { DataSourceOptions, QueryRunner } from 'typeorm';

/**
 * State that always difference by requestor context
 */
export interface DatabaseAsyncStorageStore {
  /**
   * current request process
   */
  request: any;

  /**
   * depending on which group that used as Datasource
   *
   */
  datasourceName: string;

  /**
   * Dedicated connection for
   */
  runner?: QueryRunner;
}

export interface DatabaseStrategy {
  /**
   * To know which data source that need to be used
   *
   * this useful when app is multi-tenant app
   *
   * default is "default" so it will use default datasource
   */
  getDatasourceName(): string
}

export type DatabaseAsyncOptions = FactoryProvider<DatabaseAsyncOptionsFactoryResult> & {
  imports: ModuleMetadata['imports']
  strategy?: Type<DatabaseStrategy>
}


export interface DatabaseAsyncOptionsFactoryResult {
  /**
   * initial datasources
   * 
   */
  datasources?: Array<{
    name: DatabaseAsyncStorageStore['datasourceName'];
    datasource: DataSourceOptions
  }>
}

export interface DatabaseOptions extends DatabaseAsyncOptionsFactoryResult {
  strategy?: Type<DatabaseStrategy>
}