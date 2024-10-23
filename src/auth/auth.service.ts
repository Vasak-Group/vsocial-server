import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SocialService } from '../social/social.service';
import { SocialNetwork } from 'src/social/enums/social-network.enum';
import { User } from 'src/user/entities/user.entity';
import { SocialAccount } from 'src/social/entities/social-account.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, { timestamp: true });
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private socialService: SocialService,
  ) {}

  async validateUser(email, password): Promise<any> {
    try {
      this.logger.log('Validating user with email: ' + email);
      const user = await this.userService.getUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userdata = {
          email: user.email,
          id: user.id,
        };
        return userdata;
      }
    } catch (error) {
      this.logger.error(error);
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user._id };
    this.logger.log('Generating token for user with email: ' + user.email);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async socialAuth(network: SocialNetwork, user: any): Promise<any> {
    return this.socialService.auth(network, user);
  }

  async addSocialNetwork(network: SocialNetwork, email: string): Promise<void> {
    try {
      const user: User = await this.userService.getUserByEmail(email);
      const account: SocialAccount = {
        user,
        socialNetwork: network,
        token: 'token',
      } as SocialAccount;
      user.accounts.push(account);
      await this.userService.updateUser(user.id, user);
      this.logger.log(
        'Social network: ' + network + ' added to user with email: ' + email,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
