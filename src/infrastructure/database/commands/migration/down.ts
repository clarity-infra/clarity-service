import { CommandRunner, SubCommand } from "nest-commander";
import { DatabaseService } from "../../database.service";

@SubCommand({
  name: 'down',
  description: 'downgrade database version',
})
export class DatabaseMigrationDownCommand extends CommandRunner {
  constructor(private databaseService: DatabaseService) {
    super()    
  }

  async run(): Promise<void> {
    await this.databaseService.migrator.down();
  }
}