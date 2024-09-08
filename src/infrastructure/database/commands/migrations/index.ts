import { CommandRunner, SubCommand } from "nest-commander";
import { DatabaseMigrationUpCommand } from "./up";

@SubCommand({
  name: 'migration',
  arguments: "<operation>",
  description: 'migration operation',
  subCommands: [DatabaseMigrationUpCommand]
})
export class DatabaseMigrationCommand extends CommandRunner {
  async run(): Promise<void> {
    /** not used */
  }
}