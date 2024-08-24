import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('node')
@ApiTags("Node")

export class NodeController {
  @Get()
  @ApiOperation({
    summary: "Node Pagination",
    description: "get listed of node(s) that managed by clarity platform"
  })
  paginate() {
    return []
  }
}
