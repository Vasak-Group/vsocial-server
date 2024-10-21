import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SocialService } from '../social/social.service';
import { SocialNetwork } from 'src/social/enums/social-network.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private socialService: SocialService,
  ) {}

  async validateUser(email, password): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userdata = {
        email: user.email,
        id: user.id,
      };
      return userdata;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async socialAuth(network: SocialNetwork, user: any): Promise<any> {
    return this.socialService.auth(network, user);
  }
}
