import { ConfigModule } from "@nestjs/config";
import { ValidMysqlDatabaseConfig } from "./dto/mysql-database-config.dto";
import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";
import { Connection, IDatabaseDriver } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";

export type DatabaseConfig = {
  datasource: Omit<MikroOrmModuleOptions<IDatabaseDriver<Connection>>, 'contextName'>
};

export const databaseconfig = async (): Promise<DatabaseConfig> => {
  await ConfigModule.envVariablesLoaded;
  const type = process.env.DB_TYPE;

  if (!type) throw new Error("database type must be defined on this current runtime");

  if (type === 'mysql') {
    const config = await ValidMysqlDatabaseConfig(process.env);

    return {
      datasource: {
        driver: MySqlDriver,
        host: config.DB_HOST,
        port: config.DB_PORT,
        user: config.DB_USER,
        password: config.DB_PASS,
        dbName: config.DB_NAME
      }
    }
  }

  throw new Error(`database type ${type} can't be resolve because (maybe) unsupported`)
}