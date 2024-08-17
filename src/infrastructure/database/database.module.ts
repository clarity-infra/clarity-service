import { Module } from '@nestjs/common';
import { DatabaseModule as DatabaseModuleLib } from '@clarity/database';

@Module({
  imports: [
    DatabaseModuleLib.forRoot()
  ]
})
export class DatabaseModule {}
