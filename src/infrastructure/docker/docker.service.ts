import { Docker } from '@clareza/docker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DockerService {
    constructor(private docker: Docker) {}

    version() {
        return this.docker.version();
    }
}
