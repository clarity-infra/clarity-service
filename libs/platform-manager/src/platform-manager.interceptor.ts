import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    Inject,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { PlatformManagerService } from './platform-manager.service';
import { ProcessPlatformManagerStore } from './platform-manager.interface';
  
  @Injectable()
  export class PlatformManagerInterceptor implements NestInterceptor {
    private logger = new Logger(PlatformManagerInterceptor.name);

    constructor(private pm: PlatformManagerService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      this.logger.log('intercept new request');

      const http = context.switchToHttp();

      this.logger.log('setup state');
      const store: ProcessPlatformManagerStore = {
        request: http.getRequest(),
        response: http.getResponse()
      };
  
      this.logger.log('set store on scoped function');
      return this.pm.initScopedStore(store, () => {
        const observable = next.handle();
        return observable;
      });
    }
  }
  