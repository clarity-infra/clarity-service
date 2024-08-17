import { Injectable } from '@nestjs/common';
import { DatabaseAsyncStorage } from './database.async-storage';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseConnection {
  private datasources = new Map<string, DataSource>();
  constructor(private storage: DatabaseAsyncStorage) {}

  async addDatasource(name: string, datasource: DataSource): Promise<DataSource> {
    await datasource.initialize();

    this.datasources.set(name, datasource)
    return datasource;
  }

  get datasource(): DataSource | undefined {
    const datasource = this.datasources.get(
      this.storage.datasourceName,
    );

    return datasource;
  }
}
