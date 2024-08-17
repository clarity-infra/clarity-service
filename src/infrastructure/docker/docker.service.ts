import { Docker } from '@clarity/docker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DockerService {
    constructor(private docker: Docker) {
        this.docker.version().then(console.log).catch(console.error)
    }
}
