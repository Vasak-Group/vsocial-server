import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SocialNetwork } from 'src/social/enums/social-network.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Redirect('')
  @Get(':network')
  async loginNetwork(@Param('network') network: SocialNetwork, @Request() req) {
    return await this.authService.socialAuth(network, req.user);
  }
}
