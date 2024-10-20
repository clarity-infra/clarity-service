import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IsPublic, Permission } from './auth.reflector';

type UserPayload = Awaited<ReturnType<AuthService['getSafeJWTPayload']>>;

/**
 * Application guard
 * 
 * to protect user that have no token or decide permission is forbidden or not
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check for public request: will skip checking when it is
    const is_public_allowed = await this.checkIsPublicRequest(context);
    if (is_public_allowed) return is_public_allowed;

    // get token
    const token = await this.getJWT();

    // get payload of token
    const safePayload = await this.getSafePayload(token);

    // set user session
    await this.setUserSessionFromPayload(safePayload);

    // check permission
    const is_permission_matched = await this.checkPermission(context);
    if (!is_permission_matched) return false;

    // good to go
    return true;
  }

  /**
   * logic of how check public request
   * 
   */
  private async checkIsPublicRequest(ctx: ExecutionContext): Promise<boolean> {
    const is_public_allowed = this.reflector.get(IsPublic, ctx.getHandler());

    return is_public_allowed;
  }

  /**
   * logic of how get JWT token
   * 
   */
  private async getJWT(): Promise<string> {
    const token = await this.authService.getJWT().catch((error: Error) => {
      throw new UnauthorizedException(error.message);
    });

    return token;
  }

  /**
   * logic of how verify and get payload
   * 
   */
  private async getSafePayload(jwt: string): Promise<UserPayload> {
    return this.authService.getSafeJWTPayload(jwt).catch((error: Error) => {
      throw new UnauthorizedException(error.message);
    });
  }

  /**
   * logic of how set user to session
   * 
   */
  private async setUserSessionFromPayload(payload: UserPayload) {
    await this.authService.setUserSession(payload)
  }

  /**
   * logic of how check permission
   * 
   */
  private async checkPermission(ctx: ExecutionContext) {
    // TODO: implement real permission checker
    const _ = this.reflector.get(Permission, ctx.getHandler());
    
    return true;
  }
}