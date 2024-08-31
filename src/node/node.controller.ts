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

  /**
   * get listed of node(s) that managed by platform
   * 
   */
  @Get()
  @ApiOperation({ summary: "Node Pagination" })
  async paginate(){
    const list = await this.nodeService.paginate();

    const paginate = new NodePaginateResponseDto({ list })

    return paginate
  }


  /**
   * Information detail about node like docker version
   * 
   */
  @Get(":id")
  @ApiOperation({ summary: "Node Detail" })
  async detailOf(@Param('id', { transform: v => Number(v) }) id: number) {
    return this.nodeService.getDetailById(id);
  }

  /**
   * Register new node for multi-cluster or runner
   * 
   */
  @Post()
  @ApiOperation({ summary: "Node Registration" })
  async register(@Body() body: CreateNodeRequestDto) {
    throw new NotImplementedException()
  }
}
