import { Body, Controller, Get, NotImplementedException, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NodePaginateResponseDto } from './dto/paginate-response.dto';
import { NodeService } from './node.service';
import { Authenticated } from 'src/auth/auth.decorator';
import { CreateNodeRequestDto } from './dto/create-request.dto';

@Controller('node')
@ApiTags("Node")
@Authenticated()
export class NodeController {
  constructor(private nodeService: NodeService) {}

  @Get()
  @ApiOperation({
    summary: "Node Pagination",
    description: "get listed of node(s) that managed by platform"
  })
  async paginate(){
    const list = await this.nodeService.paginate();

    const paginate = new NodePaginateResponseDto({ list })

    return paginate
  }


  @Get(":id")
  @ApiOperation({
    summary: "Node Detail",
    description: "Information detail about node like docker version"
  })
  async detailOf(@Param('id', { transform: v => Number(v) }) id: number) {
    return this.nodeService.getDetailById(id);
  }

  @Post()
  @ApiOperation({
    summary: "Register new node",
    description: "Register new node for multi-cluster or runner"
  })
  async register(@Body() body: CreateNodeRequestDto) {
    throw new NotImplementedException()
  }
}
