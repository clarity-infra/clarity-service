import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { LoggerStategy } from './logger.strategy';

type Message = string | number | object;

@Injectable({ scope: Scope.TRANSIENT })
export class ClarezaLoggerService extends ConsoleLogger {
  constructor(
    /**
     * Which service / controller that inject this log service
     */
    @Inject(INQUIRER) parentClass: object,

    /**
     * Strategy that used on this 
     */
    private strategy: LoggerStategy
  ) {
    super(
      parentClass?.constructor?.name,
      {
        timestamp: false,
      }
    );
  }

  /**
   * set context where it's injected into
   * 
   */
  setContext(...contexts: string[]) {
    this.context += contexts.reduce((mergedCtx, ctx) => {
      ctx = ctx.trim();
      
      // give marked "?" and give fatal error when missing context from expectation context
      if (!ctx) {
        this.fatal("a context missing");
        ctx = "?"
      }

      mergedCtx += `.${ctx}`;
      return mergedCtx;
    }, '')
  }

  log(message: Message) {
    const context = this.buildContext();
    message = this.buildMessage(message);
    super.log(message, context);
  }

  error(message: Message) {
    const context = this.buildContext();
    message = this.buildMessage(message);
    super.error(message, context);
  }

  debug(message: Message) {
    const context = this.buildContext();
    message = this.buildMessage(message);
    super.debug(message, context);
  }

  warn(message: Message) {
    const context = this.buildContext();
    message = this.buildMessage(message);
    super.warn(message, context);
  }

  fatal(message: Message) {
    const context = this.buildContext();
    message = this.buildMessage(message);
    super.fatal(message, context);
  }


  verbose(message: Message): void {
    const context = this.buildContext();
    message = this.buildMessage(message);
    super.verbose(message, context);
  }

  private buildContext() {
    const requestId = this.strategy.getRequestId();

    return `${requestId}|${this.context}`;
  }

  private buildMessage(message: Message) {
    const typeofMsg = typeof message;

    if (typeofMsg == 'number' || typeofMsg == 'string') return message;

    return JSON.stringify(message)
  }
}