import { CommandRunner, SubCommand } from "nest-commander";
import { DatabaseService } from "../../database.service";

@SubCommand({
  name: 'up',
  description: 'operate database to do migration up, database will be migrated to latest version',
})
export class DatabaseMigrationUpCommand extends CommandRunner {
  constructor(private databaseService: DatabaseService) {
    super()    
  }

  async run(): Promise<void> {
    await this.databaseService.migration.up();
  }
}