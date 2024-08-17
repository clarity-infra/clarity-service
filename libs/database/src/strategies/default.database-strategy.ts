import { Injectable } from "@nestjs/common";
import { DatabaseStrategy } from "../database.interface";

@Injectable()
export class DefaultDatabaseStrategy implements DatabaseStrategy{ 
  getDatasourceName(): string {
      return "default"
  }
}
