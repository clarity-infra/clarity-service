import { Controller, Get } from '@nestjs/common';
import { DockerService } from './docker.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('docker')
@ApiTags("Server Information")
export class DockerController {
    constructor(private dockerService: DockerService){}

    @Get('/docker/version')
    getVersion() {
        return this.dockerService.version();
    }
}
