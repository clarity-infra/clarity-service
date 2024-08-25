import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NodePaginateResponseDto } from './dto/paginate-response.dto';
import { NodeService } from './node.service';

@Controller('node')
@ApiTags("Node")
export class NodeController {
  constructor(private nodeService: NodeService) {}

  @Get()
  @ApiOperation({
    summary: "Node Pagination",
    description: "get listed of node(s) that managed by clarity platform"
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
}
