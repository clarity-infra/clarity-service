import { Docker } from "@clarity/docker";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'string', length: 50 })
  name!: string;

  @Column({ type: 'json' })
  config!: Docker.DockerOptions;

  constructor(initial: Node) {
    Object.assign(this, initial);
  }
}