import { Command, CommandRunner } from "nest-commander";
import { DatabaseMigrationCommand } from "./commands/migrations";

@Command({
  name: 'database',
  description: 'operate database operation',
  arguments: '<task>',
  subCommands: [DatabaseMigrationCommand]
})
export class DatabaseCommand extends CommandRunner {
  async run(): Promise<void> { }
}