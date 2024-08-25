import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    Inject
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { PlatformManagerService } from './platform-manager.service';
import { ProcessPlatformManagerStore } from './platform-manager.interface';
import { PM_TOKEN } from './platform-manager.token';
  
  @Injectable()
  export class PlatformManagerInterceptor implements NestInterceptor {
    constructor(
      private pm: PlatformManagerService,

      @Inject(PM_TOKEN.LOGGER)
      private logger: Logger
    ) { }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const http = context.switchToHttp();
      if (!http) return next.handle();

      this.logger.log('setup platform manager store');

      const store: ProcessPlatformManagerStore = {
        request: http.getRequest(),
        response: http.getResponse(),
        user: undefined,
      };
  
      return this.pm.initScopedStore(store, () => {
        this.logger.log('store has been initiated');
        const observable = next.handle();
        return observable;
      });
    }
  }
  