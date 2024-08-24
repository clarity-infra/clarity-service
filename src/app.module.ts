import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { NodeModule } from './node/node.module';

@Module({
  imports: [
    InfrastructureModule,
    NodeModule,
  ],
})
  
export class AppModule {}
