import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto } from './dto/login-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorator';

@Controller('auth')
@ApiTags("Authentication")
export class AuthController {
  constructor(private authService: AuthService) { }

  /**
   * common API to know who you are with identifier and password, 
   * **identifier is same exactly as username**
   */
  @ApiOperation({ summary: "Log-in" })
  @Post('login')
  @Public()
  signIn(@Body() signInDto: AuthLoginRequestDto) {
    return this.authService.signIn(signInDto.identifier, signInDto.password);
  }
}