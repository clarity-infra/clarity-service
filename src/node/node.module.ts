import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Node } from './node.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Node])],
  providers: [NodeService],
  controllers: [NodeController]
})
export class NodeModule {}
