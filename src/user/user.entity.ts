import { Entity, EntityRepositoryType, PrimaryKey, Property, t } from "@mikro-orm/core";
import { UserRepository } from "./user.repository";

@Entity({ repository: () => UserRepository })
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ type: t.string, length: 20 })
  identifier!: string;

  @Property({ type: t.string, length: 50 })
  password!: string;

  constructor(initial: Omit<User, 'id'>) {
    Object.assign(this, initial)
  }
}