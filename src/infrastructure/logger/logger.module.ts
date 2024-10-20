import { ClarezaLoggerModule, ClarezaLoggerService } from '@clareza/logger';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClarezaLoggerModule.register({
      global: true,
    })
  ],
})
export class LoggerModule {}
