import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { NodeModule } from './node/node.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    InfrastructureModule,
    NodeModule,
    UserModule,
  ],
})
  
export class AppModule {}
