import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerStategy {
  getRequestId() {
    return 'requestid:unknown'
  }
}