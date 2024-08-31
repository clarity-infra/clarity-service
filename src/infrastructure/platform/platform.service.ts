import { PlatformManagerService } from '@clarity/platform-manager';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http2';

@Injectable()
export class PlatformService {
  constructor(private manager: PlatformManagerService) {}
  
  get #reqeust() {
    return this.manager.request as Request;
  } 

  get headers(): IncomingHttpHeaders {
    return this.#reqeust.headers
  }

  get state(): Map<string, any> {
    return this.manager.state;
  }
}
