import { MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor(private readonly orm: MikroORM) { }
  
  get migrator() {
    return this.orm.migrator;
  }

  migration = {
    up: async () => {
      const pending = await this.migrator.getPendingMigrations();
      const is_needed = pending.length > 0;

      if (!is_needed) {
        console.log("no need to be migrated");
        return;
      }

      console.log("migration list", pending.map(v => v.name));

      await this.orm.migrator.up();
    }
  }
}
