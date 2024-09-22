import { CommandRunner, SubCommand } from "nest-commander";
import { DatabaseMigrationUpCommand } from "./up";
import { DatabaseMigrationCreateCommand } from "./create";
import { DatabaseMigrationDownCommand } from "./down";

@SubCommand({
  name: 'migration',
  arguments: "<operation>",
  description: 'migration opertion for create up and down',
  subCommands: [
    DatabaseMigrationUpCommand,
    DatabaseMigrationCreateCommand,
    DatabaseMigrationDownCommand
  ]
})
export class DatabaseMigrationCommand extends CommandRunner {
  async run(): Promise<void> {
    return;
  }
}