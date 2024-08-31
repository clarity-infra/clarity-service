import { Docker } from "@clarity/docker";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'string', length: 50 })
  name: string;

  @Column({ type: 'json' })
  dockerConfig: Docker.DockerOptions;

  constructor(initial: Omit<Node, 'id'>) {
    this.name = initial.name;
    this.dockerConfig = initial.dockerConfig;
  }
}