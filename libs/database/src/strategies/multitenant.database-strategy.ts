import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DatabaseStrategy } from "../database.interface";
import { DatabaseAsyncStorage } from "../database.async-storage";

@Injectable()
export class MultiTenantDatabaseStrategy implements DatabaseStrategy{
  constructor(private dbstorage: DatabaseAsyncStorage) {}

  getDatasourceName(): string {
    const tenant = this.dbstorage.request.headers['x-tenant'];

    if (!tenant) throw new InternalServerErrorException("datasource can't be resolved")

    return tenant;
  }
}
