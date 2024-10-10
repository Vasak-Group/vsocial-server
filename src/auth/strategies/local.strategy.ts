import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.authService.validateUser(
      email.toLowerCase(),
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}