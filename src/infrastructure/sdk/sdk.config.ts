import { ConfigModule } from "@nestjs/config";

export const sdkconfig = async () => {
  await ConfigModule.envVariablesLoaded;

  return {
    openApiUrl: "https://api.openapi-generator.tech/api/gen"
  }
}

export type SdkConfig = Awaited<ReturnType<typeof sdkconfig>>;