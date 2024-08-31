import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { PlatformService } from 'src/infrastructure/platform/platform.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private platformService: PlatformService
  ) { }

  /**
   * Get JWT From Current Request
   * 
   */
  async getJWT(): Promise<string> {
    const authHeader = this.platformService.headers.authorization;

    if (!authHeader) throw new InternalServerErrorException("authorization is not contains any data on header")

    const [type, token] = authHeader?.split(' ') ?? [];

    if (type !== 'Bearer') throw new InternalServerErrorException("supported token is only 'Bearer'");
    if (!token) throw new InternalServerErrorException("token must be defined");

    return token;
  }

  /**
   * get valid current JWT paylod, **payload isn't contains any user**
   * 
   */
  async getSafeJWTPayload(jwt: string): Promise<Pick<User, 'id'>> {
    const payload = await this.jwtService.verifyAsync(jwt).catch((e: JsonWebTokenError) => {
      throw new InternalServerErrorException(e, e.message);
    });

    return payload;
  }

  /**
   * set users session that can be use for all services as needed
   * 
   * this only can be called 1 time for each session and will throw error when try to change it more that 2 times
   * 
   */
  async setUserSession(user: Pick<User, 'id'>) {
    const isUserExist = this.platformService.state.has('auth_request_user_id');

    if (isUserExist)
      throw new InternalServerErrorException("After this set, it can't be re-setted anymore")

    this.platformService.state.set('auth_request_user_id', user.id);
  }

  /**
   * get user detail, it will intract optimized service as realtime
   * 
   */
  async getUserSession(): Promise<User> {
    const userId = this.platformService.state.get('auth_request_user_id');

    if (!userId)
      throw new InternalServerErrorException("Session was not found when you request created, it's might be user has been changed (or even deleted) when it's happend");

    return this.userService.findUserById(userId);
  }

  /**
   * usual signIn method, everyone i think know this
   * 
   * identifier is same like username / email this depends on settings
   */
  async signIn(identifier: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByIdentifier(identifier)
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