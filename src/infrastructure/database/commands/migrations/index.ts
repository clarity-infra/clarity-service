import { CommandRunner, SubCommand } from "nest-commander";

@SubCommand({ name: 'migration', description: 'operate database to do migration'  })
export class MigrationCommand extends CommandRunner {
  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    console.log("migration");
  }
}