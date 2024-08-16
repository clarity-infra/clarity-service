import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleLib } from '@nestjs/config';

@Module({
    imports: [
        ConfigModuleLib.forRoot()
    ]
})
export class ConfigModule {}
