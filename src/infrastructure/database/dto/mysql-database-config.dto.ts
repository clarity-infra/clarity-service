import { InternalServerErrorException, ValidationError } from "@nestjs/common";
import { plainToInstance, Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, validate, validateOrReject } from "class-validator";

export class MysqlDatabaseConfigDto {
  @IsNotEmpty()
  @IsString()
  DB_HOST!: string;

  @IsNotEmpty()
  @IsString()
  DB_USER!: string;

  @IsNotEmpty()
  @IsString()
  DB_PASS!: string;

  @IsNotEmpty()
  @IsString()
  DB_NAME!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((v) => {
    if (!v.value) return undefined;
    if (typeof v.value == 'string') return Number(v.value);
    if (typeof v.value == 'number') return v.value;
  })
  DB_PORT!: number;

  constructor(unknowConfig: MysqlDatabaseConfigDto) {
    Object.assign(this, unknowConfig)
  }
}

export async function ValidMysqlDatabaseConfig(unknowConfig: unknown) {
  const configObject = plainToInstance(MysqlDatabaseConfigDto, unknowConfig);

  await validate(configObject).then((errors) => {
    const concerns = errors.map(error => error.constraints);

    if (concerns.length) {
      throw new InternalServerErrorException("database config is not acceptable " + JSON.stringify(concerns));
    }
  });

  return configObject;
}