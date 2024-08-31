import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'string', length: 20 })
  identifier!: string;

  @Column({ type: "string", length: 50 })
  password!: string;

  constructor(initial: Omit<User, 'id'>) {
    Object.assign(this, initial)
  }
}