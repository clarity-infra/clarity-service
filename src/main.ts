import { AppModule } from './app.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const is_cli = process.argv[2] == "cli";

  if (is_cli) {
    // inject to skip CLI flag
    process.argv.splice(2, 1);

    // run with CLI
    await CommandFactory.run(AppModule);
    process.exit()
  } else {
    // run with HTTP
    await InfrastructureModule.CreateNestFactory(AppModule);
  }
}

bootstrap();
