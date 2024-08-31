export class PlatformManagerState {
  #request: unknown;
  #response: unknown;
  #state: Map<string, any>;

  get reqeust(): any {
    return this.#request;
  }

  get response(): any {
    return this.#response;
  }

  get state(): Map<string, any> {
    return this.#state;
  }

  constructor(initial: { request: any; response: any }) {
    this.#request = initial.request;
    this.#response = initial.response;
    this.#state = new Map();
  }
}