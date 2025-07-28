import { Controller, Post, Body,UnauthorizedException, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const jwt = await this.authService.login(user);
    res.cookie('token', jwt.access_token, {
      httpOnly: true,
      sameSite: 'lax', // bisa diubah sesuai kebutuhan
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    return {
      message: 'Login successful',
      access_token: jwt.access_token,
      user: { id: user.id, username: user.username },
    };
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
