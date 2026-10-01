import { Body, Controller, Post, HttpException, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  usersService: any;
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard) 
  findAll() {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    const usertoken = await this.authService.validateUser(data);

    if (!usertoken) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return usertoken;
  }
}