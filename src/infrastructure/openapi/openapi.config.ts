import { ConfigModule } from "@nestjs/config";

export const openapiconfig = async () => {
    await ConfigModule.envVariablesLoaded;

    return {
      name: "Clareza Node",
      description: "A modern and magic way to manage infrastructure",
      maintainer: {
        name: "Abdul Aziz Al Basyir",
        email: "abdulazizalbasyir119@gmail.com",
        website: "https://clareza.cloud"
      }
    }
}

export type OpenApiConfig = Awaited<ReturnType<typeof openapiconfig>>;