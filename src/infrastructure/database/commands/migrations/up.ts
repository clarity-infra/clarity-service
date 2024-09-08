import { CommandRunner, SubCommand } from "nest-commander";

@SubCommand({
  name: 'up',
  description: 'operate database to do migration up, database will be migrated to latest version',
})
export class DatabaseMigrationUpCommand extends CommandRunner {
  async run(): Promise<void> {
    console.log("migration up");
  }
}