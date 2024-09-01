import { Injectable, NotFoundException } from '@nestjs/common';
import { Node } from './node.entity';
import { Docker } from '@clareza/docker';

@Injectable()
export class NodeService {
  async paginate(): Promise<Node[]> {
    return [
      {
        id: 1,
        name: "localhost",
        sshConfig: {
          username: 'root',
          host: 'localhost',
        },
        dockerConfig: {
          socketPath: "/var/run/docker.sock"
        }
      }
    ]
  }

  async getDetailById(nodeId: number): Promise<
    {
      general: Node,
      docker: Docker.DockerVersion
    }  
  > {
    if (nodeId !== 1) {
      throw new NotFoundException("Node isn't found")
    }

    const general: Node = {
      id: 1,
      name: "localhost",
      sshConfig: {
        username: 'root',
        host: 'localhost',
      },
      dockerConfig: {
        socketPath: "/var/run/docker.sock"
      }
    };

    const docker = new Docker(general.dockerConfig)

    // TODO
    // curl from node to get detail IP include location
    // curl http://ip-api.com/json

    return {
      general,
      docker: await docker.version()
    }
  }
}
