import { Docker } from '@clarity/docker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DockerService {
    constructor(private docker: Docker) {}
}
