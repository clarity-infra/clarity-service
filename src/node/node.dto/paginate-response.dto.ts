import { DockerOptions } from "dockerode";
import { Node } from "../node.entity";
import { Exclude, Type } from "class-transformer";
import { PaginateDto } from "src/common/dto/paginate.dto";

class NodePaginateDataReponseDto implements Omit<Node, 'dockerConfig'> {
  id: number;
  name: string;

  /**
   * dont expect to be returned 
   */
  @Exclude()
  dockerConfig?: DockerOptions;

  constructor(params: NodePaginateDataReponseDto) {
    this.id = params.id
    this.name = params.name
  }
}

export class NodePaginateResponseDto extends PaginateDto {
  @Type(type => NodePaginateDataReponseDto)
  list: NodePaginateDataReponseDto[];

  constructor(params: NodePaginateResponseDto) {
    super();
    this.list = params.list
  }
}