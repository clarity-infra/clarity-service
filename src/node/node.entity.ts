import { DockerOptions } from "dockerode";
import { ConnectConfig } from "ssh2";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


/**
 * Node representing of Server Node
 */
@Entity()
export class Node {
  /**
   * Generated ID
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Name of node
   */
  @Column({ type: 'string', length: 50 })
  name!: string;

  /**
   * SSH connection config for connect to Node
   */
  @Column({ type: "json" })
  sshConfig!: ConnectConfig

  /**
   * Docker connection config for connect docker on "this" node
   */
  @Column({ type: 'json' })
  dockerConfig!: DockerOptions;

  constructor(initial: Omit<Node, 'id'>) {
    Object.assign(this, initial);
  }
}