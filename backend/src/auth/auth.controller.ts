import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been registered successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'The user has been login successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
