import { DataSource, Repository } from "typeorm";
import { Node } from "./node.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NodeRepository extends Repository<Node> {
  constructor(ds: DataSource) {
    super(Node, ds.createEntityManager())
  }
}