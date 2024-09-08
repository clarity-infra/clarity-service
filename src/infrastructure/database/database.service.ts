import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(private readonly orm: MikroORM) {}

  migrations = {
    up: async () => {
      const is_not_needed = ! await this.orm.migrator.checkMigrationNeeded();

      if (is_not_needed) {
        console.log("no migration needed");
        return true;
      }

      console.log("doing a migration...");
    }
  }
}
