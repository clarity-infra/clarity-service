import { Command, CommandRunner } from "nest-commander";

@Command({
  name: 'version',
  description: 'check version of this service',
})
export class VersionCommand extends CommandRunner {
  async run(inputs: string[], options: Record<string, any>): Promise<void> {
    console.log("beta")
  }
}