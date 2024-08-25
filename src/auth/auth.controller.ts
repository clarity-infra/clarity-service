import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto } from './dto/login-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: "Login",
    description: "common API to know who you are with identifier and password, **identifier is same exactly as username**"
  })
  signIn(@Body() signInDto: AuthLoginRequestDto) {
    return this.authService.signIn(signInDto.identifier, signInDto.password);
  }
}