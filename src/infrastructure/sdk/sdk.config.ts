import { ConfigModule } from "@nestjs/config";

export const sdkconfig = async () => {
  await ConfigModule.envVariablesLoaded;

  return {
    className: process.env.SDK_CLASS_NAME
  }
}

export type SdkConfig = Awaited<ReturnType<typeof sdkconfig>>;