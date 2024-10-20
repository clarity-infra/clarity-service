import { ConsoleLoggerOptions, DynamicModule, FactoryProvider, Module, Provider } from '@nestjs/common';
import { ClarezaLoggerService } from './logger.service';
import { LoggerToken } from './logger.token';
import { LoggerStategy } from './logger.strategy';

@Module({
  providers: [ClarezaLoggerService, LoggerStategy],
  exports: [ClarezaLoggerService],
})
export class ClarezaLoggerModule {
  static register(
    consumerOptions: Pick<DynamicModule, 'global'> & ConsoleLoggerOptions
  ): DynamicModule {
    const consumerOptionsProvider: Provider = {
      provide: LoggerToken.Config,
      useValue: consumerOptions
    }

    return {
      global: consumerOptions.global,
      providers: [consumerOptionsProvider],
      module: ClarezaLoggerModule,
    }
  }

  static registerAsync(consumerOptions: Pick<
    FactoryProvider<ConsoleLoggerOptions>, 'useFactory' | 'inject'> &
    Pick<DynamicModule, 'global' | 'imports'>): DynamicModule
  {
    const consumerOptionsProvider: Provider = {
      provide: LoggerToken.Config,
      inject: consumerOptions.inject,
      useFactory: consumerOptions.useFactory
    }

    return {
      global: consumerOptions.global,
      imports: consumerOptions.imports,
      providers: [consumerOptionsProvider],
      module: ClarezaLoggerModule,
    }
  }
}
