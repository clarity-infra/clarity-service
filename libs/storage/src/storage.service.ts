import { Injectable } from '@nestjs/common';
import { Storage, StorageType } from '@tweedegolf/storage-abstraction';

@Injectable()
export class StorageService {
  #storageAbstraction: Storage;

  constructor() {
    this.#storageAbstraction = new Storage({
      type: StorageType.S3,
    })
  }
}
