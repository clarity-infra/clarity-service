import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { NodeModule } from './node/node.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    InfrastructureModule,
    UserModule,
    AuthModule,
    NodeModule,
  ],
})
  
export class AppModule {}
