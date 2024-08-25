import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ProcessPlatformManagerStore } from './platform-manager.interface';

@Injectable()
export class PlatformManagerService {
    private asyncStorage = new AsyncLocalStorage<ProcessPlatformManagerStore>();

    initScopedStore<T extends () => unknown>(
        initialData: ProcessPlatformManagerStore,
        functionAsync: T,
    ) {
        return this.asyncStorage.run(initialData, functionAsync) as ReturnType<T>;
    }

    get data() {
        return this.asyncStorage.getStore();
    }
  
  
}