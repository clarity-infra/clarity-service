import { Command, CommandRunner } from "nest-commander";
import { DatabaseMigrationCommand } from "./commands/migration";

@Command({
  name: 'database',
  description: 'operate database operation',
  arguments: '<task>',
  subCommands: [DatabaseMigrationCommand]
})
export class DatabaseCommand extends CommandRunner {
  async run(): Promise<void> { 
    return;
  }
}