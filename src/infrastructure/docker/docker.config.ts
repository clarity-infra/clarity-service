import { Docker } from "@clarity/docker";
import { ConfigModule } from "@nestjs/config";

export const dockerconfig = async (): Promise<Docker.DockerOptions> => {
    await ConfigModule.envVariablesLoaded;

    return {
        socketPath: process.env.DOCKER_SOCKET_PATH
    }
}

export type DockerConfig = Awaited<ReturnType<typeof dockerconfig>>;