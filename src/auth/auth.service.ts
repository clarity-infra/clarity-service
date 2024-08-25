import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(identifier: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByIdentifier(identifier)
      .catch((e: NotFoundException) => {
        if (e.getStatus() == HttpStatus.NOT_FOUND) {
          throw new UnauthorizedException();
        }
        
        throw e;
      })

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;


    return {
      user: result,
      token: {
        accessToken: await this.jwtService.signAsync({ id: user.id }),
      }
    };
  }
}