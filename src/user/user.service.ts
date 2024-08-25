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
      identifier: identifier,
      password: "qwerty12345"
    }
  }
}
