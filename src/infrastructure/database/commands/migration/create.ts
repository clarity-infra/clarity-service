import { CommandRunner, SubCommand } from "nest-commander";
import { DatabaseService } from "../../database.service";
import { resolve } from "path";

@SubCommand({
  name: 'create',
  description: 'create new migration file',

})
export class DatabaseMigrationCreateCommand extends CommandRunner {
  constructor(private databaseService: DatabaseService) {
    super()    
  }

  async run(params: string[]): Promise<void> {
    const [name] = params;

    await this.databaseService.migrator.createMigration(
      resolve(__dirname, "../src/infrastructure/database/migrations"),
      true,
      true,
      name
    )
  }
}