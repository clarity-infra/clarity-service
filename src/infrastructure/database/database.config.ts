import { ConfigModule } from "@nestjs/config";
import { ValidMysqlDatabaseConfig } from "./dto/mysql-database-config.dto";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export type DatabaseConfig = {
  datasource: DataSourceOptions
};

export const databaseconfig = async (): Promise<DatabaseConfig> => {
  await ConfigModule.envVariablesLoaded;
  const type = process.env.DB_TYPE;

  if (!type) throw new Error("database type must be defined on this current runtime");

  if (type === 'mysql') {
    const config = await ValidMysqlDatabaseConfig(process.env);

    return {
      datasource: {
        type: "mysql",
        host: config.DB_HOST,
        username: config.DB_USER,
        password: config.DB_PASS,
        database: config.DB_NAME,
        namingStrategy: new SnakeNamingStrategy()
      }
    }
  }

  throw new Error(`database type ${type} can't be resolve because (maybe) unsupported`)
}