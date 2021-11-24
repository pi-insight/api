import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Public } from './public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _body: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('check')
  async check(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.register(body);
    return this.authService.login(user);
  }
}
