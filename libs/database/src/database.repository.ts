import { Injectable } from '@nestjs/common';
import {
  Repository as VendorRepository,
  DataSource,
  EntitySchema,
  EntityManager,
  EntityTarget,
  QueryRunner,
} from 'typeorm';

@Injectable()
export class Repository<T = EntitySchema> extends VendorRepository<T> {
  /**
   * Entity target that is managed by this repository.
   * If this repository manages entity from schema,
   * then it returns a name of that schema instead.
   */
  target: EntityTarget<T>;

  /**
   * Entity Manager used by this repository.
   */
  manager: EntityManager;

  /**
   * Query runner provider used for this repository.
   */
  queryRunner?: QueryRunner;

  /**
   * setup repository including default connection
   */
  constructor(entity: EntityTarget<T>, datasource: DataSource) {
    super(entity, datasource.createEntityManager());
  }
}
