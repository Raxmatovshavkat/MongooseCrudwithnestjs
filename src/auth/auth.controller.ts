import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterDto } from '../user/dto/register-user.dto';
import { CreateLoginDto } from 'src/user/dto/login-user.dto ';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerAuthDto: CreateRegisterDto) {
    return this.authService.signup(registerAuthDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto: CreateLoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.signIn(loginAuthDto);
  }

  @Post('verify')
  async verify(@Body('userId') userId: number |any, @Body('otp') otp: string) {
    return this.authService.verify(userId, otp);
  }

  @Post('logout/:id')
  @UseGuards(JwtAuthGuard)
  async logout(@Param('id') id: number |any ) {
    return this.authService.logout(id);
  }

  @Get('me/:id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user','admin')
  async getMe(@Param('id') id: number |any) {
    return this.authService.me(id);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
