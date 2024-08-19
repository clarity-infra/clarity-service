import { Controller, Get } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
    constructor(private dockerService: DockerService){}

    @Get('/version')
    getVersion() {
        return this.dockerService.version();
    }
}
