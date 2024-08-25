import { DockerOptions } from "dockerode";
import { Node } from "../node.entity";
import { Exclude, Type } from "class-transformer";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { ApiHideProperty } from "@nestjs/swagger";

class NodePaginateListReponseDto implements Omit<Node, 'dockerConfig'> {
  id: number;
  name: string;

  /**
   * dont expect to be returned 
   */
  @Exclude()
  @ApiHideProperty()
  dockerConfig?: DockerOptions;

  constructor(params: NodePaginateListReponseDto) {
    this.id = params.id
    this.name = params.name
  }
}

export class NodePaginateResponseDto extends PaginateDto {
  @Type(type => NodePaginateListReponseDto)
  list: NodePaginateListReponseDto[];

  constructor(params: NodePaginateResponseDto) {
    super();
    this.list = params.list
  }
}