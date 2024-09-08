import { Command, CommandRunner } from "nest-commander";
import { MigrationCommand } from "./commands/migrations";

@Command({
  name: 'database',
  description: 'operate database operation',
  // using `[]` is optional, if using `<>` will required
  arguments: '[operation]',
  subCommands: [MigrationCommand]
})
export class DatabaseCommand extends CommandRunner {
  async run(inputs: string[], options: Record<string, any>): Promise<void> { 
    console.log("database operation");
  }
}