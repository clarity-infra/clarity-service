import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { NodeModule } from './node/node.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VersionCommand } from './app.command';
import { DockerModule } from '@clareza/docker';

@Module({
  imports: [
    InfrastructureModule,
    UserModule,
    AuthModule,
    NodeModule,
  ],
  providers: [VersionCommand]
})
  
export class AppModule {}
