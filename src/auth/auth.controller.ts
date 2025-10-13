import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Public } from '../guards/public.decorator';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() authService: CreateUserDto) {
    return this.usersService.create(authService);
  }

  @Public()
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.body);
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Public()
  @Post('refresh')
  refresh(@Body('refresh_token') refresh_token: any) {
    console.log(refresh_token);
    return this.authService.refresh(refresh_token);
  }
}
