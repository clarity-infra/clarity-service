import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async findUserByIdentifier(identifier: string): Promise<User> {
    if (identifier !== "admin") {
      throw new NotFoundException("user isn't found");
    }

    return {
      id: 1,
      identifier: "admin",
      password: "qwerty12345"
    }
  }

  async findUserById(id: number): Promise<User> {
    if (id !== 1) {
      throw new NotFoundException("user isn't found");
    }

    return {
      id: 1,
      identifier: "admin",
      password: "qwerty12345"
    }
  }
}
