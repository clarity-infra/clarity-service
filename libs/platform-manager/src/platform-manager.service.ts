import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { PlatformManagerState } from './platform-manager.state';

@Injectable()
export class PlatformManagerService {
  private asyncStorage = new AsyncLocalStorage<PlatformManagerState>();

  /**
   * Storage scope to let platform manager understand which state to be keep
   * 
   */
  initPlatformScope<T extends () => unknown>(
    initialData: PlatformManagerState,
    functionAsync: T,
  ) {
    return this.asyncStorage.run(initialData, functionAsync) as ReturnType<T>;
  }

  get context() {
    const context = this.asyncStorage.getStore();  

    if (!context)
      throw new InternalServerErrorException("platform manager context is not found, is that request based?")

    return context;
  }

  /**
   * shortcut of `context.request`
   */
  get request() {
    return this.context.reqeust
  }

  /**
   * shortcut of `context.response`
   */
  get response() {
    return this.context.response
  }

  /**
   * shortcut of `context.state`
   */
  get state() {
    return this.context.state
  }
}