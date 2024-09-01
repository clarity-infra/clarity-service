import { Module } from '@nestjs/common';
import { PlatformManagerModule } from "@clareza/platform-manager"
import { PlatformService } from './platform.service';

@Module({
  imports: [
    PlatformManagerModule.forRoot(),
  ],
  providers: [PlatformService],
  exports: [PlatformService]
})
export class PlatformModule {}
