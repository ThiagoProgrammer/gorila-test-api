import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserDto) {
    return await this.authService.login(user);
  }

  @UseGuards(DoesUserExist)
  @Post('register')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
