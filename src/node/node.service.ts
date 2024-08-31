import { Injectable, NotFoundException } from '@nestjs/common';
import { Node } from './node.entity';
import { Docker } from '@clarity/docker';

@Injectable()
export class NodeService {
  async paginate(): Promise<Node[]> {
    return [
      {
        id: 1,
        name: "localhost",
        sshConfig: {
          host: '127.0.0.1',
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
        host: '127.0.0.1',
      },
      dockerConfig: {
        socketPath: "/var/run/docker.sock"
      }
    };

    const docker = new Docker(general.dockerConfig)

    return {
      general,
      docker: await docker.version()
    }
  }
}
