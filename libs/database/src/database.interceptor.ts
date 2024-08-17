import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DatabaseAsyncStorageStore, DatabaseStrategy } from './database.interface';
import { DatabaseAsyncStorage } from './database.async-storage';
import { STRATEGIES_TOKEN } from './database.constants';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  private logger = new Logger(DatabaseInterceptor.name);

  constructor(
    private storage: DatabaseAsyncStorage,
    @Inject(STRATEGIES_TOKEN) private strategy: DatabaseStrategy
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('intercept request')

    this.logger.log('setup connection state');
    const store: DatabaseAsyncStorageStore = {
      datasourceName: this.strategy.getDatasourceName(),
      request: context.switchToHttp().getRequest()
    };

    this.logger.log('init connection state with ' + store.datasourceName);
    return this.storage.initHookWith(store, () => {
      const observable = next.handle();

      observable.subscribe({
        error: (err: Error) => {
          return err;
        },
        complete: () => {
        },
      });

      this.logger.log('continuing to process');
      return observable;
    });
  }
}
