import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PlatformModule } from 'src/infrastructure/platform/platform.module';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from './auth.guard';

@Module({
  imports: [
    PlatformModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: "TODO",
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JWTGuard
    }
  ]
})
export class AuthModule {}
