import { Inject, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { PlatformManagerService } from "./platform-manager.service";
import { PM_TOKEN } from "./platform-manager.token";
import { PlatformManagerState } from "./platform-manager.state";

@Injectable()
export class PlatformManagerMiddleware implements NestMiddleware {
  constructor(
    private pm: PlatformManagerService,

    @Inject(PM_TOKEN.LOGGER)
    private logger: Logger
  ) { }

  use(req: Request, res: Response, next: NextFunction) {
    const store = new PlatformManagerState({
      request: req,
      response: res
    });

    return this.pm.initPlatformScope(store, () => next());
  }
}