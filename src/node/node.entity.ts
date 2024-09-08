import { Entity, PrimaryKey, Property, t } from "@mikro-orm/core";
import { DockerOptions } from "dockerode";
import { ConnectConfig } from "ssh2";


/**
 * Node representing of Server Node
 */
@Entity()
export class Node {
  /**
   * Generated ID
   */
  @PrimaryKey({ autoincrement: true, type: t.string })
  id!: number;

  /**
   * Name of node
   */
  @Property({ type: t.string, length: 50 })
  name!: string;

  /**
   * SSH connection config for connect to Node
   */
  @Property({ type: t.json })
  sshConfig!: ConnectConfig

  /**
   * Docker connection config for connect docker on "this" node
   */
  @Property({ type: t.json })
  dockerConfig!: DockerOptions;

  constructor(initial: Omit<Node, 'id'>) {
    Object.assign(this, initial);
  }
}