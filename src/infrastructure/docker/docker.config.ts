import { Docker } from "@clareza/docker";
import { ConfigModule } from "@nestjs/config";

export const dockerconfig = async (): Promise<Docker.DockerOptions> => {
    await ConfigModule.envVariablesLoaded;

    return {
      socketPath: process.env.DOCKER_SOCKET_PATH || "/var/run/docker.sock"
    }
}

export type DockerConfig = Awaited<ReturnType<typeof dockerconfig>>;