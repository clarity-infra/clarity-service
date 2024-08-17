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
    this.logger.log('intercept new request')

    this.logger.log('setup connection state');
    const store: DatabaseAsyncStorageStore = {
      datasourceName: this.strategy.getDatasourceName(),
      request: context.switchToHttp().getRequest()
    };

    this.logger.log('init connection state with ' + store.datasourceName);
    return this.storage.initHookWith(store, () => {
      const observable = next.handle();

      observable.subscribe({
        error: (err) => {
          this.logger.log('error detected, releasing transaction connection');
          //
          this.logger.log('transaction connection released');
          return err;
        },
        complete: () => {
          this.logger.log('completed, releasing transaction connection');
          //
          this.logger.log('transaction connection released');
        },
      });

      this.logger.log('continuing to process');
      return observable;
    });
  }
}
