import { DockerOptions } from "dockerode";
import { Node } from "../node.entity";
import { Exclude, Type } from "class-transformer";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { ApiHideProperty } from "@nestjs/swagger";

class NodePaginateListReponseDto implements Node {
  /**
   * Id of Node
   */
  id: number;

  /**
   * Name of Node
   */
  name: string;

  /**
   * this field is not available on this object
   * 
   */
  @Exclude()
  @ApiHideProperty()
  dockerConfig: any;

  /**
   * this field is not available on this object
   * 
   */
  @Exclude()
  @ApiHideProperty()
  sshConfig: any;

  constructor(params: Omit<Node, 'dockerConfig' | 'sshConfig'>) {
    this.id = params.id
    this.name = params.name
  }
}

export class NodePaginateResponseDto extends PaginateDto {
  /**
   * List of Node
   */
  @Type(type => NodePaginateListReponseDto)
  list: NodePaginateListReponseDto[];

  constructor(params: NodePaginateResponseDto) {
    super();
    this.list = params.list
  }
}