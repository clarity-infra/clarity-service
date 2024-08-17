import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { DatabaseAsyncStorageStore } from './database.interface';

@Injectable()
export class DatabaseAsyncStorage<R = any> {
  private asyncStorage = new AsyncLocalStorage<DatabaseAsyncStorageStore>();

  initHookWith<T extends () => unknown>(
    initialData: DatabaseAsyncStorageStore,
    functionAsync: T,
  ) {
    return this.asyncStorage.run(initialData, functionAsync) as ReturnType<T>;
  }

  private get store(): undefined | DatabaseAsyncStorageStore {
    return this.asyncStorage.getStore();
  }

  get datasourceName(): DatabaseAsyncStorageStore['datasourceName'] {
    if (!this.store) return "default";

    return this.store.datasourceName
  }

  get request(): any {
    if (!this.store) return undefined

    return this.store?.request
  }
}
