import { Injectable, NotFoundException } from '@nestjs/common';
import { Node } from './node.entity';
import { Docker } from '@clarity/docker';

@Injectable()
export class NodeService {
  async paginate() {
    const node = new Node({
      id: 1,
      name: "localhost",
      config: {}
    })

    return [node]
  }

  async getDetailById(nodeId: number) {
    if (nodeId !== 1) {
      throw new NotFoundException("Node isn't found")
    }

    const general = new Node({
      id: 1,
      name: "localhost",
      config: {
        socketPath: "/var/run/docker.sock"
      }
    });

    const docker = new Docker(general.config)

    return {
      general: general,
      docker: await docker.version()
    }
  }
}
