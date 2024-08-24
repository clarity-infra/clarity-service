import { ConfigModule } from "@nestjs/config";

export const openapiconfig = async () => {
    await ConfigModule.envVariablesLoaded;

    return {
      name: "Clarity Service",
      description: "Clarify is a cloud platform that automates the deployment, management, and scaling of your applications. Designed with developers in mind, Clarify offers a hassle-free experience, supporting multiple programming languages and frameworks. Focus on building your applications, and let Clarify handle the infrastructure.",
      maintainer: {
        name: "Abdul Aziz Al Basyir",
        email: "abdulazizalbasyir119@gmail.com",
        website: "clarity.albasyir.net/author"
      }
    }
}

export type OpenApiConfig = Awaited<ReturnType<typeof openapiconfig>>;